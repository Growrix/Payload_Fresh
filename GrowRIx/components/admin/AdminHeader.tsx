"use client";

import { useRouter } from 'next/navigation';

export default function AdminHeader() {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-800 bg-panel">
      <div className="flex items-center space-x-4">
        <div className="text-xl font-space-grotesk font-bold text-text">GR</div>
        <div>
          <div className="text-sm text-subtext">Admin Panel</div>
          <div className="text-xs text-subtext">growrix</div>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <input
          placeholder="Search admin panel..."
          className="bg-background px-3 py-2 rounded-lg border border-gray-700 text-text"
        />

        <button
          onClick={() => router.push('/admin-login')}
          className="px-3 py-2 bg-accent text-white rounded-lg"
        >
          Logout
        </button>

        <div className="text-right">
          <div className="text-sm font-medium text-text">Admin User</div>
          <div className="text-xs text-subtext">admin@growrix.com</div>
        </div>
      </div>
    </header>
  );
}
