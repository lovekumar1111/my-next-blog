// src/app/api/me/route.js
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get('token');

  if (!tokenCookie) {
    return NextResponse.json({ user: null });
  }

  try {
    const token = tokenCookie.value;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        image: true, // ✅ Include image field
      },
    });

    return NextResponse.json({ user: user || null });
  } catch (error) {
    console.error('Token verification failed:', error);
    return NextResponse.json({ user: null });
  }
}
