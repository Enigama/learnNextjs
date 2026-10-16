'use server';

import { redirect } from 'next/navigation';
import { hashUserPassword, verifyPassword } from '@/lib/hash';
import { createUser, getUserByEmail } from '@/lib/user';
import { createSession, destroySession } from '@/lib/auth';
import { loginFormData } from '@/lib/loginData';

interface ErrorAuth {
  errors: Record<string, string>;
}

async function authenticatePass(userId: number | bigint) {
  await createSession(userId);
  redirect('/training');
}

export async function signup(
  _: unknown,
  formData: FormData,
): Promise<ErrorAuth | undefined | void> {
  const { email, password, errors } = loginFormData(formData);
  if (Object.keys(errors).length) {
    return { errors };
  }

  const hasedPassword = hashUserPassword(password);
  try {
    const userId = createUser(email, hasedPassword);
    await authenticatePass(userId);
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
}

export async function login(
  _: unknown,
  formData: FormData,
): Promise<ErrorAuth | undefined | void> {
  const { email, password, errors } = loginFormData(formData);
  if (Object.keys(errors).length) {
    return { errors };
  }

  const existingUser = getUserByEmail(email);

  if (!existingUser) {
    return {
      errors: {
        email: 'Could not authenticate user, please check your credentials',
      },
    };
  }

  const isVerifiedPassword = verifyPassword(existingUser.password, password);
  if (!isVerifiedPassword) {
    return {
      errors: {
        password: 'Invalid password',
      },
    };
  }

  await authenticatePass(existingUser.id);
}

export async function auth(
  mode: string,
  prevState: unknown,
  formData: FormData,
) {
  if (mode === 'login') {
    return login(prevState, formData);
  }
  return signup(prevState, formData);
}

export async function logout() {
  await destroySession();
  redirect('/');
}
