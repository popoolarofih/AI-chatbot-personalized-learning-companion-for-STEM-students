import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const getChatCompletion = async (
  messages: { role: 'user' | 'assistant' | 'system'; content: string }[],
  model = 'llama-3.3-70b-versatile'
) => {
  try {
    const response = await groq.chat.completions.create({
      messages,
      model,
      temperature: 0.7,
      max_tokens: 4096,
      top_p: 1,
      stream: false,
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error in Groq chat completion:', error);
    throw error;
  }
};
