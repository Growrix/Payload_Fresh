"use client";

import React from 'react';
import { Button } from './ui/button';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-[#050505] to-[#0B0B0B] py-20">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Design & Build <span className="text-accent">beautiful</span> product experiences</h1>
        <p className="text-subtext mb-8">A lightweight UI kit extracted from GrowRIx — copy these components into your project and drop in data as needed.</p>
        <div className="flex gap-4 justify-center">
          <Button className="px-6 py-3">Get Started</Button>
          <Button className="bg-transparent border border-[#9C6BFF]">Explore Demos</Button>
        </div>
      </div>
    </section>
  );
}
