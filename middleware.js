import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
export function middleware(req) {
  const url = req.nextUrl;
  const isEditingBlog = req.method === 'PUT' || req.method === 'DELETE';
  const isBlogApi = url.pathname.startsWith('/api/blog/');

  if (isEditingBlog && isBlogApi) {
    const authHeader = req.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const token = authHeader.split(' ')[1];
    if (token !== 'admin-token-123') {
      return new NextResponse(JSON.stringify({ error: 'Forbidden' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/blog/:slug*'],
};
{
  const token = req.cookies.get('token')?.value;

  if (!token) return NextResponse.redirect(new URL('/login', req.url));

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}