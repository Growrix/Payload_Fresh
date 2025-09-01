'use client'

import { motion } from 'framer-motion'

export default function DirectContactCard() {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-[#0B0B0B] p-6 rounded-2xl border border-[#9C6BFF]/20"
    >
      <h3 className="text-xl font-bold mb-4 font-['Space_Grotesk']">Contact</h3>

      <div className="space-y-4">
        <div>
          <div className="text-sm text-[#B0B0B0]">Email</div>
          <a href="mailto:hello@growrix.com" className="text-[#9C6BFF]">
            hello@growrix.com
          </a>
        </div>

        <div>
          <div className="text-sm text-[#B0B0B0]">Chat</div>
          <div className="flex gap-2 mt-2">
            <a className="px-3 py-2 bg-[#111] rounded-lg text-sm text-[#B0B0B0]">Discord</a>
            <a className="px-3 py-2 bg-[#111] rounded-lg text-sm text-[#B0B0B0]">WhatsApp</a>
          </div>
        </div>

        <div>
          <div className="text-sm text-[#B0B0B0]">Location</div>
          <div className="text-white">San Francisco, CA</div>
        </div>

        <div className="mt-4">
          <a
            href="#"
            className="inline-flex items-center px-4 py-2 bg-[#9C6BFF] text-white rounded-lg"
          >
            Book Call
          </a>
        </div>
      </div>
    </motion.aside>
  )
}
