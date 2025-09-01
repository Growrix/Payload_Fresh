"use client";

import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#0B0B0B] p-12 rounded-2xl border border-[#9C6BFF]/20">
      <div className="text-center max-w-3xl mx-auto">
        <h3 className="text-3xl md:text-4xl font-bold mb-4 font-['Space_Grotesk']">Still wondering if we’re the right team?</h3>
        <p className="text-[#B0B0B0] mb-8">Let’s chat — no pressure.</p>
        <div className="flex justify-center">
          <a href="#" className="inline-flex items-center px-6 py-3 bg-[#9C6BFF] text-white rounded-lg hover:shadow-[0_0_30px_rgba(156,107,255,0.4)]">Book a Free Discovery Call</a>
        </div>
      </div>
    </motion.section>
  );
}
