'use client'

import ContactHero from '@/components/growrix/ContactHero'
import ContactForm from '@/components/growrix/ContactForm'
import DirectContactCard from '@/components/growrix/DirectContactCard'
import FinalCTA from '@/components/growrix/FinalCTA'
import Navbar from '@/components/growrix/Navbar'
import Footer from '@/components/growrix/Footer'
import { motion } from 'framer-motion'

export default function ContactPage() {
  const container = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.12,
        when: 'beforeChildren',
      },
    },
  }

  return (
    <main className="min-h-screen bg-[#0B0B0B] text-white">
      <Navbar />

      <ContactHero />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="max-w-7xl mx-auto px-6 py-12 relative z-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          <div>
            <DirectContactCard />
          </div>
        </div>

        <div className="mt-20">
          <FinalCTA />
        </div>
      </motion.div>

      <Footer />
    </main>
  )
}
