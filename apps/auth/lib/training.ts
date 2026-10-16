import db from './db';

interface Training {
  id: number;
  title: string;
  image: string;
  description: string;
}
export function getTrainings() {
  const stmt = db.prepare<[], Training>('SELECT * FROM trainings');
  return stmt.all();
}
