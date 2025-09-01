'use client'

import { motion, useSpring, useTransform } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect, useState, useMemo } from 'react'

const stats = [
  {
    number: 150,
    suffix: '+',
    label: 'Projects Delivered',
    description: 'Successfully launched digital products',
  },
  {
    number: 50,
    suffix: '+',
    label: 'Active Clients',
    description: 'Trusted partnerships worldwide',
  },
  {
    number: 98,
    suffix: '%',
    label: 'Retention Rate',
    description: 'Clients who come back for more',
  },
]

function Counter({ target, suffix, isInView }) {
  const count = useSpring(0, { stiffness: 100, damping: 20 })
  const [value, setValue] = useState(0)

  useEffect(() => {
    const unsubscribe = count.onChange((v) => {
      setValue(Math.round(v))
    })

    if (isInView) count.set(target)

    return () => unsubscribe()
  }, [isInView, count, target])

  return (
    <span className="text-5xl md:text-6xl font-bold font-['Space_Grotesk'] text-transparent bg-clip-text bg-gradient-to-r from-[#9C6BFF] to-[#FF6B9D]">
      {value}
      {suffix}
    </span>
  )
}

export default function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 px-6 bg-[#181818]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-['Space_Grotesk']">
            Results That Matter
          </h2>
          <p className="text-xl text-[#B0B0B0] font-['Inter'] max-w-2xl mx-auto">
            Numbers that showcase our commitment to delivering exceptional digital experiences
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-[#0B0B0B] rounded-3xl p-12 border border-[#9C6BFF]/20 relative overflow-hidden"
          style={{
            boxShadow: '0 0 60px rgba(156, 107, 255, 0.1)',
          }}
        >
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#9C6BFF]/5 to-[#FF6B9D]/5" />

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {useMemo(() => {
              const particles = Array.from({ length: 6 }).map(() => ({
                left: Math.random() * 100,
                top: Math.random() * 100,
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 2,
              }))
              return particles.map((p, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-[#9C6BFF] rounded-full opacity-30"
                  style={{
                    left: `${p.left}%`,
                    top: `${p.top}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: p.duration,
                    repeat: Infinity,
                    delay: p.delay,
                  }}
                />
              ))
            }, [])}
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.2 }}
                className="text-center group"
              >
                <motion.div whileHover={{ scale: 1.05 }} className="mb-4">
                  <Counter target={stat.number} suffix={stat.suffix} isInView={isInView} />
                </motion.div>

                <h3 className="text-2xl font-bold mb-3 font-['Space_Grotesk'] text-white group-hover:text-[#9C6BFF] transition-colors duration-300">
                  {stat.label}
                </h3>

                <p className="text-[#B0B0B0] font-['Inter'] leading-relaxed">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-12"
        >
          <p className="text-[#B0B0B0] font-['Inter'] text-lg">
            Join the growing list of satisfied clients who trust us with their digital
            transformation
          </p>
        </motion.div>
      </div>
    </section>
  )
}
