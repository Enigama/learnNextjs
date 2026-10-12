export default function Messages({
  messages,
}: {
  messages: { id: number; text: string }[];
}) {
  return (
    <ul className="messages">
      {messages.map((message) => (
        <li key={message.id}>{message.text}</li>
      ))}
    </ul>
  );
}
