"use client";

import { motion } from "framer-motion";

export default function DemoCTA() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-7xl mx-auto px-6 py-12"
    >
      <div className="rounded-2xl bg-gradient-to-r from-[#0F0F10] to-[#0B0B0B] p-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Have an idea? Let's build your version.</h2>
          <p className="text-gray-300 mt-2">We'll craft a demo tailored to your needs.</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          className="mt-4 md:mt-0 bg-[#9C6BFF] px-6 py-3 rounded-lg text-white font-semibold"
        >
          Request Free Demo
        </motion.button>
      </div>
    </motion.section>
  );
}
