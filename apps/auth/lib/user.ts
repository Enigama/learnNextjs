import db from './db';

export interface User {
  id: number;
  email: string;
}
export interface Session {
  id: string;
  user_id: string;
  expires_at: number;
}

export function createUser(email: string, password: string) {
  const result = db
    .prepare('INSERT INTO users (email, password) VALUES (?, ?)')
    .run(email, password);
  return result.lastInsertRowid;
}

export function getUserByEmail(email: string) {
  return db
    .prepare<
      [string],
      { password: string } & User
    >('SELECT * FROM users WHERE email = ?')
    .get(email);
}
