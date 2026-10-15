'use server';

import { redirect } from 'next/navigation';
import { hashUserPassword } from '../lib/hash';
import { createUser } from '../lib/user';
import { createSession } from '../lib/auth';

export async function signup(_, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const errors: Record<string, string> = {};

  if (!email.includes('@')) {
    errors.email = 'Please enter a valid email address.';
  }

  if (password.trim().length < 8) {
    errors.password = 'Password must be at least 8 characters long.';
  }

  if (Object.keys(errors).length) {
    return { errors };
  }

  const hasedPassword = hashUserPassword(password);
  try {
    const userId = createUser(email, hasedPassword);
    await createSession(userId);
  } catch (error) {
    //@ts-expect-error SQL error code
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return {
        errors: {
          email: 'It seems like an account for chosen email aready exists.',
        },
      };
    }

    return {
      errors: {
        fallback: JSON.stringify(errors.message ?? 'Something went wrong.'),
      },
    };
  }
  redirect('/training');
}
