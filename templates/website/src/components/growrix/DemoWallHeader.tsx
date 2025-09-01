'use client'

import { motion } from 'framer-motion'

export default function DemoWallHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden bg-gradient-to-b from-[#070707] via-[#0B0B0B] to-[#070707]"
    >
      <div className="absolute inset-0 opacity-30 bg-[url('/grid-bg.svg')] bg-repeat" />

      <div className="relative max-w-7xl mx-auto px-6 py-28 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
          Explore Our Live Demos
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          Real results, real clients. Click through and explore the work.
        </p>
      </div>
    </motion.header>
  )
}
