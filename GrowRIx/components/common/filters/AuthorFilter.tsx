"use client";

const AUTHORS = ['Alice','Bob','Charlie'];

export default function AuthorFilter({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <label className="inline-flex items-center">
      <span className="sr-only">Author</span>
      <select aria-label="Author filter" value={value} onChange={(e)=> onChange(e.target.value)} className="p-2 bg-surface border border-gray-600 rounded-lg text-text">
        <option value="all">All authors</option>
        {AUTHORS.map(a=> <option key={a} value={a}>{a}</option>)}
      </select>
    </label>
  );
}
