"use client";

import React from 'react';
import { Button } from './ui/button';

export default function Navbar() {
  return (
    <header className="bg-transparent py-6">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="text-white font-semibold text-xl">GrowRIx</div>
        <nav className="hidden md:flex gap-6">
          <a className="text-subtext hover:text-white">Features</a>
          <a className="text-subtext hover:text-white">Demo</a>
          <a className="text-subtext hover:text-white">Blog</a>
          <a className="text-subtext hover:text-white">Contact</a>
        </nav>
        <div className="hidden md:block"><Button>Request Demo</Button></div>
        <div className="md:hidden"><Button>Menu</Button></div>
      </div>
    </header>
  );
}
