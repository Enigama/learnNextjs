import { cookies } from 'next/headers';
import db from './db';
import { Session, User } from './user';

const AUTH_SESSION_KEY = 'auth_session';

export async function createSession(userId: number | bigint) {
  const session = crypto.randomUUID();
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // today + 7 days

  // save into db session
  db.prepare(
    `INSERT INTO sessions (id, expires_at, user_id) VALUES (?, ?, ?)`,
  ).run(session, expiresAt, userId);

  // set up a cookie
  const cookieStore = await cookies();
  cookieStore.set(AUTH_SESSION_KEY, session, {
    expires: expiresAt,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
  });
}

export async function verifyAuth() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(AUTH_SESSION_KEY);
  const noData = Object.freeze({
    user: null,
    session: null,
  });

  console.log('init verify', sessionCookie);

  if (!sessionCookie) {
    return noData;
  }

  const sessionId = sessionCookie.value;
  console.log('verify session id', sessionId);

  if (!sessionId) {
    return noData;
  }

  // 1.validate session
  const dbsession = db
    .prepare<
      [string],
      Session
    >(`SELECT id, expires_at, user_id FROM sessions WHERE id = ?`)
    .get(sessionId);

  if (!dbsession) {
    return noData;
  }
  if (dbsession.expires_at < Date.now()) {
    db.prepare(`DELETE FROM sessions WHERE id = ?`).run(dbsession.id);
    return noData;
  }

  // 2. refresh session if it's exists

  const dbUser = db
    .prepare<[string], User>('SELECT id, email FROM users WHERE id = ?')
    .get(dbsession.user_id);

  return { user: dbUser, session: dbsession };
}

export async function destroySession() {
  const { session } = await verifyAuth();

  if (!session) {
    return {
      error: 'Unauthorized',
    };
  }

  // remove session from db
  db.prepare('DELETE FROM sessions WHERE id = ?').run(session.id);
  // delete cookie
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_SESSION_KEY);
}
