import sql from 'better-sqlite3';
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

export const getMessages = cache(() => {
  console.log('Fetching messages from db');
  return db.prepare<[], CreateMessage[]>('SELECT * FROM messages').all();
});
