import sql from 'better-sqlite3';
import { unstable_cache } from 'next/cache';
import { cache } from 'react';

export interface CreateMessage {
  id: number;
  text: string;
}

const db = new sql('messages.db');

function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY,
      text TEXT
    )`);
}

initDb();

export function addMessage(message: string) {
  db.prepare('INSERT INTO messages (text) VALUES (?)').run(message);
}

export const getMessages = unstable_cache(
  cache(() => {
    console.log('Fetching messages from db');
    return new Promise((r) =>
      r(db.prepare<[], CreateMessage[]>('SELECT * FROM messages').all()),
    );
  }),
  ['messages'],
  {
    tags: ['msg'],
  },
);
