import { CreateMessage } from '@/lib/messages';

export default function Messages({ messages }: { messages: CreateMessage[] }) {
  return (
    <ul className="messages">
      {messages.map((message) => (
        <li key={message.id}>{message.text}</li>
      ))}
    </ul>
  );
}
