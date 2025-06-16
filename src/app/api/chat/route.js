// /api/chat/route.js
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { message, blogPosts } = body;

    if (!message || !blogPosts) {
      return NextResponse.json({ reply: '❗Invalid input.' }, { status: 400 });
    }

    // ✅ Filter and summarize blog posts
    const blogContext = blogPosts.map((post) => {
      return `• ${post.title}: ${post.content.slice(0, 150)}...`;
    }).join('\n');

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // use 'gpt-4' only if you have access and quota
      messages: [
        {
          role: 'system',
          content: `Tum ek helpful chatbot ho jo sirf in homepage blog posts ke baare mein hi jawab dega:\n\n${blogContext}`,
        },
        {
          role: 'user',
          content: message,
        },
      ],
    });

    const reply = completion.choices[0].message.content;
    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ reply: '❌ Aapka OpenAI quota khatam ho gaya hai ya server error aaya.' }, { status: 500 });
  }
}
