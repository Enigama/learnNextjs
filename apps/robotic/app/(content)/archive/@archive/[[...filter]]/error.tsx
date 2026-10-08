"use client";

export default function FilterError({ error }: { error: Error }) {
  return (
    <div>
      <h2>An error occured!</h2>
      <p>{error.message}</p>
    </div>
  );
}
