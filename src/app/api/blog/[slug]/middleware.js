import { NextResponse } from 'next/server'

// Simulated token verification (replace with real logic)
function verifyToken(req) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;

  const token = authHeader.split(' ')[1];

  // Replace this with real verification logic (e.g., JWT or session)
  if (token === 'admin-token-123') {
    return { role: 'admin' }; // pretend user is admin
  }

  return null;
}

export function middleware(req) {
  const user = verifyToken(req);

  if (!user || user.role !== 'admin') {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return NextResponse.next();
}

// Match PUT and DELETE requests only
export const config = {
  matcher: ['/api/blog/:slug*'],
};
