import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const item = await request.json();
    const filePath = path.join(process.cwd(), 'data', 'ideation.json');
    
    const data = await fs.readFile(filePath, 'utf-8');
    const items = JSON.parse(data);
    
    items.unshift(item);
    
    await fs.writeFile(filePath, JSON.stringify(items, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving ideation item:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
