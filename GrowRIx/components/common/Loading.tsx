"use client";

export default function Loading() {
  return (
    <div className="p-12 text-center">
      <div className="animate-spin inline-block w-8 h-8 border-4 border-t-accent border-gray-600 rounded-full mb-4" />
      <div className="text-subtext">Loading…</div>
    </div>
  );
}
