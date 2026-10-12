'use server';

import { redirect } from 'next/navigation';
import { addMessage } from '@/lib/messages';

export async function createMessage(formData: FormData) {
  const message = formData.get('message') as string;
  addMessage(message);
  redirect('/messages');
}
