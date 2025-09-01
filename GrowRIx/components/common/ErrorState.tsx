"use client";

export default function ErrorState({ message }: { message?: string }) {
  return (
    <div className="p-12 text-center text-red-400">
      <div className="text-lg font-bold mb-2">Error</div>
      <div className="text-subtext">{message || 'Something went wrong.'}</div>
    </div>
  );
}
