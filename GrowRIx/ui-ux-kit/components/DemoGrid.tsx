"use client";

import { motion } from "framer-motion";

const mockDemos = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  title: [
    "SaaS Dashboard UI",
    "Ecommerce Storefront",
    "Marketing Landing",
    "Analytics Suite",
    "Booking Flow",
    "Portfolio Showcase",
    "AI Demo Console",
    "Fintech Dashboard",
  ][i % 8],
  image: `https://source.unsplash.com/collection/190727/800x600?sig=${i}`,
  tags: ["React", "Tailwind", i % 2 === 0 ? "SaaS" : "UI"],
}));

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const card = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function DemoGrid() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="max-w-7xl mx-auto px-6 py-12"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockDemos.map((d) => (
          <motion.article
            key={d.id}
            variants={card}
            className="relative bg-[#0F0F10] rounded-xl overflow-hidden shadow-lg transform transition-transform hover:-translate-y-1 hover:scale-[1.02]"
          >
            <div className="aspect-[4/3] bg-gray-800">
              <img
                src={d.image}
                alt={d.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-white">{d.title}</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {d.tags.map((t) => (
                  <span
                    key={t}
                    className="text-sm text-gray-300 bg-[#0B0B0B]/40 px-2 py-1 rounded-md"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex justify-end">
                <button className="px-4 py-2 rounded-md bg-[#9C6BFF] text-white font-medium hover:shadow-[0_0_24px_rgba(156,107,255,0.18)]">
                  Request Similar Demo
                </button>
              </div>

              {/* Neon border glow on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}
