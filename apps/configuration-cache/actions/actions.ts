'use server';

import { redirect } from 'next/navigation';
import { addMessage } from '@/lib/messages';
import { updateTag } from 'next/cache';
// import { revalidatePath } from 'next/cache';

export async function createMessage(formData: FormData) {
  const message = formData.get('message') as string;
  addMessage(message);
  // revalidatePath('/messages');
  updateTag('msg');
  redirect('/messages');
}
