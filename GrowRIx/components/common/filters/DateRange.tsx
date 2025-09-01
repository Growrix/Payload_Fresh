"use client";

export default function DateRange({ valueFrom, valueTo, onChange }: { valueFrom?: string; valueTo?: string; onChange: (from?: string, to?: string)=>void }) {
  return (
    <div className="inline-flex items-center gap-2">
      <label className="sr-only">From date</label>
      <input aria-label="From date" type="date" defaultValue={valueFrom} onChange={(e)=> onChange(e.target.value || undefined, valueTo)} className="p-2 bg-surface border border-gray-600 rounded-lg text-text" />
      <span className="text-subtext">to</span>
      <label className="sr-only">To date</label>
      <input aria-label="To date" type="date" defaultValue={valueTo} onChange={(e)=> onChange(valueFrom, e.target.value || undefined)} className="p-2 bg-surface border border-gray-600 rounded-lg text-text" />
    </div>
  );
}
