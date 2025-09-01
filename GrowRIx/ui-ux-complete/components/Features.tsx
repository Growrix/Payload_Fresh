"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Code2, 
  Palette, 
  Brain, 
  Smartphone, 
  Database, 
  Zap 
} from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "Custom Development",
    description: "Tailored solutions built with cutting-edge technologies"
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Beautiful interfaces that users love to interact with"
  },
  {
    icon: Brain,
    title: "AI Integration",
    description: "Smart applications powered by artificial intelligence"
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Native and cross-platform mobile solutions"
  },
  {
    icon: Database,
    title: "Backend Systems",
    description: "Scalable infrastructure and API development"
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Lightning-fast applications optimized for speed"
  }
];

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 px-6 bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-['Space_Grotesk']">
            Our Expertise
          </h2>
          <p className="text-xl text-[#B0B0B0] font-['Inter'] max-w-2xl mx-auto">
            We specialize in crafting digital experiences that drive growth and innovation
          </p>
        </motion.div>

        <div className="pb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.06 }}
                whileHover={{ 
                  y: -8,
                  boxShadow: "0 20px 40px rgba(156, 107, 255, 0.12)"
                }}
                className="bg-[#181818] p-8 rounded-2xl border border-[#9C6BFF]/20 hover:border-[#9C6BFF]/40 transition-all duration-300 w-full group cursor-pointer"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-[#9C6BFF]/10 rounded-2xl mb-6 group-hover:bg-[#9C6BFF]/20 transition-colors duration-300">
                  <feature.icon className="w-8 h-8 text-[#9C6BFF]" />
                </div>

                <h3 className="text-2xl font-bold mb-4 font-['Space_Grotesk'] text-white">
                  {feature.title}
                </h3>

                <p className="text-[#B0B0B0] font-['Inter'] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
