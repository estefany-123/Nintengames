import { NextResponse } from 'next/server';
import verifyToken from './lib/verifyToken';

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  const publicPaths = ['/api/users/login', '/api/docs', '/api/users','/api/auth/login','/api/platforms','/api/categories','/api/games'];

  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  const authHeader = req.headers.get('Authorization');
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ message: 'No token provided' }, { status: 401 });
  }

  try {
    const payload = await verifyToken(token);
    return NextResponse.next();
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ['/api/:path*'],
};