import { NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';

export async function POST(request: Request) {
  try {
    const { title, content, tags, secret } = await request.json();
    
    // Verify secret to prevent unauthorized access
    if (secret !== process.env.WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    if (!title || !content) {
      return NextResponse.json({ error: 'Missing title or content' }, { status: 400 });
    }
    
    // Initialize GitHub API client
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN
    });
    
    const owner = 'SovietMeteor10';
    const repo = 'personaldash';
    const path = 'data/research.json';
    const branch = 'main';
    
    // Get current file content and SHA
    const { data: fileData } = await octokit.repos.getContent({
      owner,
      repo,
      path,
      ref: branch,
    });
    
    if (!('content' in fileData)) {
      throw new Error('File not found');
    }
    
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
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: `Add research report: ${title}`,
      content: newContent,
      sha: fileData.sha,
      branch,
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Research report added and pushed to GitHub',
      report: newReport 
    });
  } catch (error) {
    console.error('Error saving research report:', error);
    return NextResponse.json({ 
      error: 'Failed to save research report',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
