"use client";

export default function Empty({ message }: { message?: string }) {
  return (
    <div className="p-12 text-center">
      <div className="text-2xl text-subtext mb-2">No items</div>
      <div className="text-subtext">{message || 'Nothing to show.'}</div>
    </div>
  );
}
