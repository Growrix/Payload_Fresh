'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Play } from 'lucide-react'

const caseStudies = [
  {
    id: 1,
    brand: 'TechVenture',
    title: 'Complete Digital Transformation',
    result: '+300% Growth',
    tags: ['E-commerce', 'Mobile App', 'Analytics'],
    image: '/case-studies/techventure.jpg',
    video: '/case-studies/techventure-video.mp4',
    color: 'from-blue-500 to-purple-600',
  },
  {
    id: 2,
    brand: 'EcoFresh',
    title: 'Sustainable Marketplace Platform',
    result: '+250% Revenue',
    tags: ['Marketplace', 'Sustainability', 'UX Design'],
    image: '/case-studies/ecofresh.jpg',
    video: '/case-studies/ecofresh-video.mp4',
    color: 'from-green-500 to-teal-600',
  },
  {
    id: 3,
    brand: 'FinanceFlow',
    title: 'AI-Powered Financial Dashboard',
    result: '+400% Efficiency',
    tags: ['FinTech', 'AI', 'Dashboard'],
    image: '/case-studies/financeflow.jpg',
    video: '/case-studies/financeflow-video.mp4',
    color: 'from-yellow-500 to-orange-600',
  },
]

export default function CaseStudies() {
  const [hoveredCase, setHoveredCase] = useState<number | null>(null)
  const [playingVideo, setPlayingVideo] = useState<number | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const handleVideoPlay = (id: number) => {
    setPlayingVideo(id)
  }

  return (
    <section ref={ref} className="py-20 px-6 bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-6 font-['Space_Grotesk']">
            Success <span className="text-[#9C6BFF]">Stories</span>
          </h2>
          <p className="text-xl text-[#B0B0B0] max-w-3xl mx-auto font-['Inter']">
            Real results from real partnerships. See how we've helped businesses transform their
            digital presence and achieve remarkable growth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group bg-[#1A1A1A] rounded-2xl overflow-hidden hover:bg-[#2A2A2A] transition-all duration-300"
              onMouseEnter={() => setHoveredCase(study.id)}
              onMouseLeave={() => {
                setHoveredCase(null)
                setPlayingVideo(null)
              }}
            >
              <div className="relative aspect-video overflow-hidden">
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${study.color} opacity-20`}
                  animate={{
                    opacity: hoveredCase === study.id ? 0.4 : 0.2,
                  }}
                  transition={{ duration: 0.3 }}
                />

                <motion.div
                  className="absolute inset-0 bg-[#1A1A1A] flex items-center justify-center"
                  animate={{
                    scale: hoveredCase === study.id ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="w-16 h-16 bg-[#9C6BFF] rounded-full flex items-center justify-center cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleVideoPlay(study.id)}
                  >
                    {playingVideo === study.id ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 bg-white rounded-sm"
                      />
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="w-6 h-6 text-white flex items-center justify-center"
                      >
                        <Play className="w-6 h-6 fill-current" />
                      </motion.div>
                    )}
                  </motion.div>
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

                <p className="text-[#B0B0B0] mb-4 font-['Inter']">{study.title}</p>

                <div className="text-[#9C6BFF] font-bold text-lg font-['Inter']">
                  {study.result}
                </div>
              </div>
            </motion.div>
          ))}
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
              boxShadow: '0 0 20px #9C6BFF40',
            }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-[#9C6BFF] text-[#9C6BFF] px-8 py-4 rounded-lg font-['Inter'] font-semibold hover:bg-[#9C6BFF] hover:text-white transition-all duration-300"
          >
            View All Projects
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
