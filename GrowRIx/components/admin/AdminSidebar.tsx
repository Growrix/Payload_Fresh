"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export default function AdminSidebar() {
  const [openPosts, setOpenPosts] = useState(false);

  // Dashboard should be at the very top. Blog group lives below it.
  const links = [
    { label: 'Demos', href: '/growrix-admin/demos' },
    { label: 'Products', href: '/growrix-admin/products' },
    { label: 'Users', href: '/growrix-admin/users' }
  ];

  return (
    <aside className="w-64 bg-panel border-r border-gray-800 p-4 overflow-auto">
      <div className="mb-6">
        <div className="text-2xl font-space-grotesk font-bold text-text">GR</div>
        <p className="text-xs text-subtext">Growrix Admin v1.0</p>
      </div>

      <nav className="space-y-2">
        {/* Dashboard first */}
        <Link href="/growrix-admin" className="block px-3 py-2 rounded-lg hover:bg-gray-800/30 text-text">
          Dashboard
        </Link>

        {/* Blog dropdown (contains Posts, Create, Categories, Tags, Media) */}
        <div>
          <button
            onClick={() => setOpenPosts(!openPosts)}
            aria-expanded={openPosts}
            className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-800/30 text-text"
          >
            <span className="text-sm">Blog</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${openPosts ? 'rotate-180' : ''}`} />
          </button>

          {openPosts && (
            <div className="mt-1 space-y-1 pl-4">
              <Link href="/growrix-admin/blog/posts" className="block px-3 py-2 rounded-lg hover:bg-gray-800/20 text-text text-sm">
                All Posts
              </Link>
              <Link href="/growrix-admin/blog/posts/new" className="block px-3 py-2 rounded-lg hover:bg-gray-800/20 text-text text-sm">
                Create Post
              </Link>
              <Link href="/growrix-admin/blog/categories" className="block px-3 py-2 rounded-lg hover:bg-gray-800/20 text-text text-sm">
                Categories
              </Link>
              <Link href="/growrix-admin/blog/tags" className="block px-3 py-2 rounded-lg hover:bg-gray-800/20 text-text text-sm">
                Tags
              </Link>
              <Link href="/growrix-admin/blog/media" className="block px-3 py-2 rounded-lg hover:bg-gray-800/20 text-text text-sm">
                Media
              </Link>
              <Link href="/growrix-admin/blog/comments" className="block px-3 py-2 rounded-lg hover:bg-gray-800/20 text-text text-sm">
                Comments
              </Link>
            </div>
          )}

          <div className="mt-3 border-t border-gray-800 pt-3">
            <button className="w-full text-left px-3 py-2 rounded-lg text-subtext bg-transparent cursor-not-allowed" aria-disabled>
              Settings (disabled)
            </button>
          </div>
        </div>

        {/* Other links */}
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="block px-3 py-2 rounded-lg hover:bg-gray-800/30 text-text">
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
