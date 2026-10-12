'use server';

import { redirect } from 'next/navigation';
import { addMessage } from '@/lib/messages';
import { revalidatePath } from 'next/cache';

export async function createMessage(formData: FormData) {
  const message = formData.get('message') as string;
  addMessage(message);
  revalidatePath('/messages');
  redirect('/messages');
}
