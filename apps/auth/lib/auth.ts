import { cookies } from 'next/headers';
import db from './db';

export async function createSession(userId: number | bigint) {
  const session = crypto.randomUUID();
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;

  // save into db session
  db.prepare(
    `INSERT INTO sessions (id, expires_at, user_id) VALUES (?, ?, ?)`,
  ).run(session, expiresAt, userId);

  // set up a cookie
  const cookieStore = await cookies();
  cookieStore.set('auth_session', session, {
    expires: expiresAt,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
  });
}
