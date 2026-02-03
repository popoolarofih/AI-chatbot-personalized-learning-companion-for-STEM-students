import { NextRequest, NextResponse } from 'next/server';
import { extractTextFromPdf } from '@/services/documentProcessor';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let text = '';

    if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      text = await extractTextFromPdf(buffer);
    } else {
      text = buffer.toString('utf-8');
    }

    return NextResponse.json({
      filename: file.name,
      text: text,
      message: 'File processed successfully'
    });
  } catch (error) {
    console.error('Upload error:', error);
    const message = error instanceof Error ? error.message : 'Failed to process file';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
