import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

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
    
    const filePath = path.join(process.cwd(), 'data', 'research.json');
    
    // Read existing reports
    const data = await fs.readFile(filePath, 'utf-8');
    const reports = JSON.parse(data);
    
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
    
    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(reports, null, 2));
    
    // Commit and push to GitHub
    try {
      await execAsync('git config user.name "Research Bot"');
      await execAsync('git config user.email "bot@personaldash.com"');
      await execAsync('git add data/research.json');
      await execAsync(`git commit -m "Add research report: ${title}"`);
      await execAsync('git push');
    } catch (gitError) {
      console.error('Git error:', gitError);
      // Still return success even if git fails
    }
    
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
