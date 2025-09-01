'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import HeroSection from '@/components/growrix/HeroSection'
import Navbar from '@/components/growrix/Navbar'
import Footer from '@/components/growrix/Footer'
import Features from '@/components/growrix/Features'
import CaseStudies from '@/components/growrix/CaseStudies'
import ProcessTimeline from '@/components/growrix/ProcessTimeline'
import StatsSection from '@/components/growrix/StatsSection'
import ShopPreview from '@/components/growrix/ShopPreview'
import FinalCTA from '@/components/growrix/FinalCTA'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0B0B0B]">
      <Navbar />
      <HeroSection />
      <Features />
      <CaseStudies />
      <ProcessTimeline />
      <StatsSection />
      <ShopPreview />
      <div className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <FinalCTA />
        </div>
      </div>
      <Footer />
    </div>
  )
}
