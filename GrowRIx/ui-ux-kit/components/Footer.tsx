import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-[#222] mt-16">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between">
        <div className="text-white font-semibold">GrowRIx</div>
        <div className="text-subtext text-sm">© " + new Date().getFullYear() + " GrowRIx. All rights reserved.</div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a className="text-subtext hover:text-white">Privacy</a>
          <a className="text-subtext hover:text-white">Terms</a>
        </div>
      </div>
    </footer>
  );
}
