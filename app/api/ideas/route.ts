import { NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';

export async function POST(request: Request) {
  try {
    const { title, content, category, tags, secret } = await request.json();
    
    // Verify secret to prevent unauthorized access
    if (secret !== process.env.WEBHOOK_SECRET) {
      console.error('❌ Secret mismatch!');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    if (!title) {
      return NextResponse.json({ error: 'Missing title' }, { status: 400 });
    }
    
    console.log('💡 Saving idea:', title.slice(0, 100));
    
    // Initialize GitHub API client
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN
    });
    
    const owner = 'SovietMeteor10';
    const repo = 'personaldash';
    const path = 'data/ideas.json';
    const branch = 'main';
    
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
    
    // Decode current content
    const currentContent = Buffer.from(fileData.content, 'base64').toString('utf-8');
    const ideas = JSON.parse(currentContent);
    
    // Create new idea
    const newIdea = {
      id: Date.now().toString(),
      title,
      content: content || '',
      category: category || 'Business',
      timestamp: new Date().toISOString(),
      tags: tags || [],
    };
    
    // Add to beginning of array
    ideas.unshift(newIdea);
    
    // Encode new content
    const newContent = Buffer.from(JSON.stringify(ideas, null, 2)).toString('base64');
    
    // Commit to GitHub
    console.log('💾 Committing idea to GitHub...');
    
    const commitResult = await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: `Add idea: ${title}`,
      content: newContent,
      sha: fileData.sha,
      branch,
    });
    
    console.log('✅ Idea committed!');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Idea saved and pushed to GitHub',
      idea: newIdea,
      commitSha: commitResult.data.commit.sha
    });
  } catch (error) {
    console.error('Error saving idea:', error);
    return NextResponse.json({ 
      error: 'Failed to save idea',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
