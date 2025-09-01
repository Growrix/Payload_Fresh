"use client";

export default function DemoFilters() {
  const filters = ["All", "SaaS", "Landing", "E‑commerce", "AI"];
  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="flex gap-3 flex-wrap">
        {filters.map((f) => (
          <button
            key={f}
            className="px-3 py-1 rounded-full border border-[#2A2A2A] text-gray-200 hover:ring-2 hover:ring-[#9C6BFF] transition-all"
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}
