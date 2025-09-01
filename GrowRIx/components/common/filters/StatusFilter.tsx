"use client";

export default function StatusFilter({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <label className="inline-flex items-center">
      <span className="sr-only">Status</span>
      <select aria-label="Status filter" value={value} onChange={(e)=> onChange(e.target.value)} className="p-2 bg-surface border border-gray-600 rounded-lg text-text">
        <option value="all">All</option>
        <option value="published">Published</option>
        <option value="draft">Draft</option>
        <option value="scheduled">Scheduled</option>
        <option value="private">Private</option>
        <option value="trash">Trash</option>
      </select>
    </label>
  );
}
