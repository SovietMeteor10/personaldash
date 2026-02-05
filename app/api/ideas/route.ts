import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const idea = await request.json();
    const filePath = path.join(process.cwd(), 'data', 'ideas.json');
    
    const data = await fs.readFile(filePath, 'utf-8');
    const ideas = JSON.parse(data);
    
    ideas.unshift(idea);
    
    await fs.writeFile(filePath, JSON.stringify(ideas, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving idea:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
