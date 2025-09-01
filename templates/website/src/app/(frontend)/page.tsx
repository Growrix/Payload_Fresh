'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import HeroSection from '@/components/growrix/HeroSection'
import Navbar from '@/components/growrix/Navbar'
import Footer from '@/components/growrix/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0B0B0B] text-white">
      <Navbar />
      <HeroSection />
      {/* Add more sections here as needed */}
      <Footer />
    </main>
  )
}
