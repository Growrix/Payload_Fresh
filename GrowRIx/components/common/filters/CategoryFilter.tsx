"use client";

const CATS = ['Next.js','Supabase','Accessibility','TypeScript','Performance','Web'];

export default function CategoryFilter({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <label className="inline-flex items-center">
      <span className="sr-only">Category</span>
      <select aria-label="Category filter" value={value} onChange={(e)=> onChange(e.target.value)} className="p-2 bg-surface border border-gray-600 rounded-lg text-text">
        <option value="all">All categories</option>
        {CATS.map(c=> <option key={c} value={c}>{c}</option>)}
      </select>
    </label>
  );
}
