"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink } from "lucide-react";

const caseStudies = [
  {
    id: 1,
    brand: "TechFlow",
    title: "E-commerce Platform Redesign",
    result: "300% increase in conversions",
    image: "/api/placeholder/600/400",
    video: "/api/placeholder/600/400",
    tags: ["E-commerce", "UI/UX", "React"]
  },
  {
    id: 2,
    brand: "MindSpace",
    title: "AI-Powered Analytics Dashboard",
    result: "50% reduction in analysis time",
    image: "/api/placeholder/600/400",
    video: "/api/placeholder/600/400",
    tags: ["AI", "Dashboard", "Analytics"]
  },
  {
    id: 3,
    brand: "GreenEarth",
    title: "Sustainability Tracking App",
    result: "1M+ active users",
    image: "/api/placeholder/600/400",
    video: "/api/placeholder/600/400",
    tags: ["Mobile", "Sustainability", "React Native"]
  },
  {
    id: 4,
    brand: "FinanceHub",
    title: "Banking Mobile Application",
    result: "99.9% uptime achieved",
    image: "/api/placeholder/600/400",
    video: "/api/placeholder/600/400",
    tags: ["Fintech", "Security", "Mobile"]
  }
];

export default function CaseStudies() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section ref={ref} className="py-24 px-6 bg-[#181818]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-['Space_Grotesk']">
            Our Work
          </h2>
          <p className="text-xl text-[#B0B0B0] font-['Inter'] max-w-2xl mx-auto">
            Discover how we've helped businesses transform their digital presence
          </p>
        </motion.div>

        <div className="pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                onMouseEnter={() => setHoveredId(study.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="bg-[#0B0B0B] rounded-2xl overflow-hidden border border-[#9C6BFF]/20 hover:border-[#9C6BFF]/40 transition-all duration-300 group cursor-pointer w-full"
              >
                <div className="relative h-64 overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full bg-gradient-to-br from-[#9C6BFF]/20 to-[#FF6B9D]/20 flex items-center justify-center"
                  >
                    {hoveredId === study.id ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-6xl text-[#9C6BFF]"
                      >
                        ▶
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 1 }}
                        className="text-8xl text-[#9C6BFF]/30"
                      >
                        📱
                      </motion.div>
                    )}
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-[#9C6BFF]/10 flex items-center justify-center"
                  >
                    <ExternalLink className="w-8 h-8 text-white" />
                  </motion.div>
                </div>

                <div className="p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-[#9C6BFF]/20 text-[#9C6BFF] rounded-full text-sm font-['Inter']"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2 font-['Space_Grotesk'] text-white">
                    {study.brand}
                  </h3>
                  
                  <p className="text-[#B0B0B0] mb-4 font-['Inter']">
                    {study.title}
                  </p>
                  
                  <div className="text-[#9C6BFF] font-bold text-lg font-['Inter']">
                    {study.result}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 20px #9C6BFF40"
            }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-[#9C6BFF] text-[#9C6BFF] px-8 py-4 rounded-lg font-['Inter'] font-semibold hover:bg-[#9C6BFF] hover:text-white transition-all duration-300"
          >
            View All Projects
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
