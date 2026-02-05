import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const essay = await request.json();
    const filePath = path.join(process.cwd(), 'data', 'essays.json');
    
    const data = await fs.readFile(filePath, 'utf-8');
    const essays = JSON.parse(data);
    
    essays.unshift(essay);
    
    await fs.writeFile(filePath, JSON.stringify(essays, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving essay:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
