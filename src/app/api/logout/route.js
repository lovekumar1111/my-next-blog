// src/app/api/signup/route.js
import { writeFile } from 'fs/promises';
import path from 'path';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function POST(req) {
  try {
    const form = await req.formData();

    const name = form.get('name');
    const email = form.get('email');
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    const image = form.get('image');

    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ success: false, message: 'Passwords do not match' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ success: false, message: 'User already exists' }, { status: 409 });
    }

    let imageUrl = null;
    if (image && image.name) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = Date.now() + '-' + image.name.replaceAll(' ', '_');
      const filePath = path.join(process.cwd(), 'public/uploads', filename);

      await writeFile(filePath, buffer);
      imageUrl = `/uploads/${filename}`;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        image: imageUrl,
      },
    });

    return NextResponse.json({ success: true, user: { email: user.email, name: user.name, image: user.image } });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
