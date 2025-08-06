import * as jose from 'jose';

export default async function verifyToken(token) {
  try {
    const secret = new TextEncoder().encode(process.env.SECRET);
    const { payload } = await jose.jwtVerify(token, secret);
    return payload;
  } catch (err) {
    throw new Error('Invalid token');
  }
}