"use client";

import { motion } from "framer-motion";

export default function ContactHero() {
  return (
  <section className="relative flex items-center justify-center bg-[#0B0B0B] overflow-hidden pt-20 md:pt-28">
      <canvas className="absolute inset-0 w-full h-full opacity-30" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-6 pb-8 md:pb-12"
      >
  <h1 className="text-4xl md:text-5xl font-bold mb-4 font-['Space_Grotesk']">Let's Build Something Exceptional</h1>
  <p className="text-lg text-[#B0B0B0] max-w-2xl mx-auto">Drop us a line or book a call — we're excited to hear about your next project.</p>
      </motion.div>
    </section>
  );
}
