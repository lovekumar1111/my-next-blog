import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
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
    const image = form.get('image'); // File object

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ success: false, message: 'User already exists' });
    }

    let imagePath = '';
    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${image.name.replace(/\s/g, '_')}`;
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');

      if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true });
      }

      const fullPath = path.join(uploadDir, filename);
      await writeFile(fullPath, buffer);

      imagePath = `/uploads/${filename}`; // PUBLIC URL PATH
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        image: imagePath,
      },
    });

    return NextResponse.json({
      success: true,
      user: { email: user.email, name: user.name, image: user.image },
    });
  } catch (error) {
    console.error('Signup Error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' });
  }
}
