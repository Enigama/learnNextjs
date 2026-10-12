// import { unstable_noStore } from 'next/cache';
import Messages from '@/components/messages';

// export const revalidate = 5; //next js read this constant and add to all fetch that has in this file
export const dynamic = 'force-dynamic'; // same as cache: 'no-store' but this is for all fetch in this file

export default async function MessagesPage() {
  // unstable_noStore(); // same as cache: 'no-store' but for single component, useful if we have cache for all components in this file but 1 or 2 should not have a cache
  const response = await fetch('http://localhost:8080/messages');
  const messages = await response.json();

  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }

  return <Messages messages={messages} />;
}
