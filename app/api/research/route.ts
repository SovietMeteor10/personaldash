import { NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';

export async function POST(request: Request) {
  try {
    console.log('📥 Webhook received request');
    
    const { title, content, tags, secret } = await request.json();
    
    console.log('📝 Title:', title?.slice(0, 100));
    console.log('📊 Content length:', content?.length);
    console.log('🏷️ Tags:', tags);
    console.log('🔐 Secret provided:', !!secret);
    console.log('🔐 Expected secret set:', !!process.env.WEBHOOK_SECRET);
    
    // Verify secret to prevent unauthorized access
    if (secret !== process.env.WEBHOOK_SECRET) {
      console.error('❌ Secret mismatch!');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    if (!title || !content) {
      console.error('❌ Missing title or content');
      return NextResponse.json({ error: 'Missing title or content' }, { status: 400 });
    }
    
    console.log('✅ Validation passed');
    
    // Initialize GitHub API client
    console.log('🔧 Initializing GitHub client');
    console.log('🔐 GitHub token set:', !!process.env.GITHUB_TOKEN);
    
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN
    });
    
    const owner = 'SovietMeteor10';
    const repo = 'personaldash';
    const path = 'data/research.json';
    const branch = 'main';
    
    console.log('📥 Fetching current file from GitHub...');
    
    // Get current file content and SHA
    const { data: fileData } = await octokit.repos.getContent({
      owner,
      repo,
      path,
      ref: branch,
    });
    
    // Type guard to ensure we got a file, not a directory or array
    if (Array.isArray(fileData) || !('content' in fileData)) {
      throw new Error('File not found or is a directory');
    }
    
    console.log('✅ File fetched, SHA:', fileData.sha.slice(0, 10));
    
    // Decode current content
    const currentContent = Buffer.from(fileData.content, 'base64').toString('utf-8');
    const reports = JSON.parse(currentContent);
    
    // Create new report
    const newReport = {
      id: Date.now().toString(),
      title,
      content,
      timestamp: new Date().toISOString(),
      tags: tags || [],
    };
    
    // Add to beginning of array
    reports.unshift(newReport);
    
    // Encode new content
    const newContent = Buffer.from(JSON.stringify(reports, null, 2)).toString('base64');
    
    // Commit to GitHub
    console.log('💾 Committing to GitHub...');
    
    const commitResult = await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: `Add research report: ${title}`,
      content: newContent,
      sha: fileData.sha,
      branch,
    });
    
    console.log('✅ Committed! New SHA:', commitResult.data.commit.sha?.slice(0, 10));
    
    return NextResponse.json({ 
      success: true, 
      message: 'Research report added and pushed to GitHub',
      report: newReport,
      commitSha: commitResult.data.commit.sha
    });
  } catch (error) {
    console.error('Error saving research report:', error);
    return NextResponse.json({ 
      error: 'Failed to save research report',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
