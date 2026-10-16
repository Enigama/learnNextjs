import AuthForm from '@/components/auth-form';
import React from 'react';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ mode: string }>;
}) {
  const { mode = 'login' } = await searchParams;
  console.log(mode);
  return <AuthForm mode={mode} />;
}
