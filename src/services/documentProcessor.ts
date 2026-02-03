import { PDFParse } from 'pdf-parse';

export const extractTextFromPdf = async (buffer: Buffer): Promise<string> => {
  try {
    const parser = new PDFParse(new Uint8Array(buffer));
    const data = await parser.getText();
    // In this version of pdf-parse, getText() might return the text directly
    // or an object. Based on common patterns in newer versions:
    if (typeof data === 'string') return data;
    if (data && typeof data === 'object' && 'text' in data) {
      return (data as { text: string }).text;
    }
    return '';
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw new Error('Failed to parse PDF document');
  }
};

export const chunkText = (text: string, chunkSize = 2000): string[] => {
  const chunks: string[] = [];
  let currentPos = 0;
  while (currentPos < text.length) {
    chunks.push(text.slice(currentPos, currentPos + chunkSize));
    currentPos += chunkSize;
  }
  return chunks;
};
