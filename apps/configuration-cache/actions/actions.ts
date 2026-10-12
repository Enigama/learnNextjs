'use server';

import { redirect } from 'next/navigation';
import { addMessage } from '@/lib/messages';
import { revalidateTag } from 'next/cache';

export async function createMessage(formData: FormData) {
  const message = formData.get('message') as string;
  addMessage(message);
  revalidateTag('msg', 'max');
  redirect('/messages');
}
