"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Search, 
  Palette, 
  Code, 
  Rocket 
} from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discovery",
    description: "We dive deep into your business goals, target audience, and technical requirements to create a solid foundation."
  },
  {
    icon: Palette,
    title: "Design",
    description: "Our designers craft beautiful, user-centered interfaces that align with your brand and drive engagement."
  },
  {
    icon: Code,
    title: "Build",
    description: "Our developers bring designs to life with clean, scalable code and cutting-edge technologies."
  },
  {
    icon: Rocket,
    title: "Launch",
    description: "We deploy your project with thorough testing, optimization, and ongoing support for continued success."
  }
];

export default function ProcessTimeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 px-6 bg-[#0B0B0B]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-['Space_Grotesk']">
            Our Process
          </h2>
          <p className="text-xl text-[#B0B0B0] font-['Inter'] max-w-2xl mx-auto">
            A proven methodology that delivers exceptional results every time
          </p>
        </motion.div>

        <div className="relative">
          {/* Glowing timeline line */}
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : { height: 0 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute left-8 top-0 w-1 bg-gradient-to-b from-[#9C6BFF] to-[#FF6B9D] rounded-full"
            style={{ 
              boxShadow: "0 0 20px #9C6BFF",
              filter: "blur(0.5px)"
            }}
          />

          <div className="space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                className="relative flex items-start"
              >
                {/* Step circle */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
                  className="relative z-10 flex items-center justify-center w-16 h-16 bg-[#9C6BFF] rounded-full mr-8"
                  style={{ 
                    boxShadow: "0 0 30px #9C6BFF60"
                  }}
                >
                  <step.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 + index * 0.2 }}
                    className="text-3xl font-bold mb-4 font-['Space_Grotesk'] text-white"
                  >
                    {step.title}
                  </motion.h3>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 1.4 + index * 0.2 }}
                    className="text-[#B0B0B0] font-['Inter'] leading-relaxed text-lg"
                  >
                    {step.description}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 2.5 }}
          className="text-center mt-20"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px #9C6BFF60"
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#9C6BFF] text-white px-8 py-4 rounded-lg font-['Inter'] font-semibold text-lg"
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
