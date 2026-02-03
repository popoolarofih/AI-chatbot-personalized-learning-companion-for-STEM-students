import { NextRequest, NextResponse } from 'next/server';
import { getChatCompletion } from '@/services/groq';

const SYSTEM_PROMPT = `You are the STEM Companion AI, a highly intelligent and personalized learning tutor for STEM students.
Your core mission is to guide students using the Socratic method and adaptive scaffolding.

RULES:
1. SOCRATIC METHOD: Never give direct answers initially. Instead, ask probing questions that lead the student to the answer.
2. KNOWLEDGE GAP DETECTION: If a student struggles with a concept, identify if they are missing a prerequisite and offer to review that first.
3. ADAPTIVE SCAFFOLDING: Provide hints that are just enough to overcome the immediate hurdle. Break complex problems into smaller, interactive steps.
4. STEM ACCURACY: Ensure all mathematical, scientific, and technical information is rigorous and accurate.
5. MULTIMODAL SUPPORT: Describe visual aids, diagrams, or graphs in detail to help the student visualize the concepts.
6. RESOURCE CURATION: Suggest external resources (like MIT OCW, 3Blue1Brown, or specific textbooks) when a student needs deeper immersion.
7. REFUSAL: Gently refuse to provide direct solutions to homework or exam questions. Explain that your role is to help them learn how to solve it.

TONE: Encouraging, academic, patient, and intellectually stimulating.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    console.log('Received body:', body);
    if (!body) {
      return NextResponse.json({ error: 'Empty body' }, { status: 400 });
    }
    const { messages, context } = JSON.parse(body);

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages' }, { status: 400 });
    }

    const fullMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages,
    ];

    // If there is document context, prepend it to the system message or as a separate system message
    if (context) {
      fullMessages.splice(1, 0, {
        role: 'system',
        content: `Relevant Context from Documents: ${context}`
      });
    }

    const response = await getChatCompletion(fullMessages);

    return NextResponse.json({ message: response });
  } catch (error) {
    console.error('Chat API Error:', error);
    const message = error instanceof Error ? error.message : 'Failed to process chat';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
