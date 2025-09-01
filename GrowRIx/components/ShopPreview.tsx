"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Download, Globe, Smartphone } from "lucide-react";

const products = [
  {
    id: 1,
    title: "UI Kit Pro",
    description: "Complete design system with 200+ components",
    priceRange: "$99 - $299",
    icon: Globe,
    tags: ["Design System", "Figma", "React"]
  },
  {
    id: 2,
    title: "Mobile App Templates",
    description: "Ready-to-use React Native app templates",
    priceRange: "$149 - $499",
    icon: Smartphone,
    tags: ["React Native", "Templates", "iOS/Android"]
  },
  {
    id: 3,
    title: "Code Generators",
    description: "AI-powered tools for rapid development",
    priceRange: "$199 - $599",
    icon: Download,
    tags: ["AI Tools", "Automation", "Development"]
  }
];

export default function ShopPreview() {
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
            Digital Products
          </h2>
          <p className="text-xl text-[#B0B0B0] font-['Inter'] max-w-2xl mx-auto">
            Ready-made solutions to accelerate your development process
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 25px 50px rgba(156, 107, 255, 0.2)"
              }}
              className="bg-[#181818] rounded-2xl p-8 border border-[#9C6BFF]/20 hover:border-[#9C6BFF]/40 transition-all duration-300 group cursor-pointer relative overflow-hidden"
            >
              {/* Background glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#9C6BFF]/5 to-[#FF6B9D]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />

              <div className="relative z-10">
                <div className="flex items-center justify-center w-16 h-16 bg-[#9C6BFF]/10 rounded-2xl mb-6 group-hover:bg-[#9C6BFF]/20 transition-colors duration-300">
                  <product.icon className="w-8 h-8 text-[#9C6BFF]" />
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[#9C6BFF]/20 text-[#9C6BFF] rounded-full text-sm font-['Inter']"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl font-bold mb-4 font-['Space_Grotesk'] text-white">
                  {product.title}
                </h3>

                <p className="text-[#B0B0B0] mb-6 font-['Inter'] leading-relaxed">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-[#9C6BFF] font-['Space_Grotesk']">
                    {product.priceRange}
                  </span>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 text-[#9C6BFF] hover:text-white transition-colors duration-300 font-['Inter'] font-medium"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px #9C6BFF60"
            }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-3 bg-[#9C6BFF] text-white px-8 py-4 rounded-lg font-['Inter'] font-semibold text-lg transition-all duration-300"
          >
            <span>Browse Shop</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-8"
        >
          <p className="text-[#B0B0B0] font-['Inter']">
            Save time and ship faster with our premium digital products
          </p>
        </motion.div>
      </div>
    </section>
  );
}
