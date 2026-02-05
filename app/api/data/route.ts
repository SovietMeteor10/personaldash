import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    
    const [links, ideas, essays, reports, ideation] = await Promise.all([
      fs.readFile(path.join(dataDir, 'links.json'), 'utf-8'),
      fs.readFile(path.join(dataDir, 'ideas.json'), 'utf-8'),
      fs.readFile(path.join(dataDir, 'essays.json'), 'utf-8'),
      fs.readFile(path.join(dataDir, 'research.json'), 'utf-8'),
      fs.readFile(path.join(dataDir, 'ideation.json'), 'utf-8'),
    ]);

    return NextResponse.json({
      links: JSON.parse(links).quickLinks || [],
      ideas: JSON.parse(ideas),
      essays: JSON.parse(essays),
      reports: JSON.parse(reports),
      ideation: JSON.parse(ideation),
    });
  } catch (error) {
    console.error('Error loading data:', error);
    return NextResponse.json({ 
      links: [], 
      ideas: [], 
      essays: [], 
      reports: [], 
      ideation: [] 
    });
  }
}
