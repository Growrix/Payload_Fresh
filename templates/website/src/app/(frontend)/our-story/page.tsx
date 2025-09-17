'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/growrix/Navbar'
import Footer from '@/components/growrix/Footer'
import {
  Lightbulb,
  Rocket,
  Users,
  Globe,
  Award,
  TrendingUp,
  Target,
  Heart,
  Clock,
  Star,
} from 'lucide-react'

export default function OurStoryPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  }

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  }

  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const timeline = [
    {
      year: '2019',
      title: 'The Beginning',
      description:
        'Growrix was founded with a simple vision: to help businesses thrive in the digital age. Our founders, Sarah and Marcus, started in a small garage with big dreams.',
      icon: Lightbulb,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      year: '2020',
      title: 'First Breakthrough',
      description:
        'Launched our first major SaaS platform for a Fortune 500 client, establishing our reputation for delivering enterprise-grade solutions.',
      icon: Rocket,
      color: 'from-purple-500 to-pink-500',
    },
    {
      year: '2021',
      title: 'Team Expansion',
      description:
        'Grew from 3 to 15 team members, bringing together top talent in design, development, and strategy from around the world.',
      icon: Users,
      color: 'from-green-500 to-teal-500',
    },
    {
      year: '2022',
      title: 'Global Reach',
      description:
        'Expanded internationally, serving clients across 25+ countries and establishing partnerships with leading technology providers.',
      icon: Globe,
      color: 'from-orange-500 to-red-500',
    },
    {
      year: '2023',
      title: 'Industry Recognition',
      description:
        'Received multiple awards for our innovative work in AI integration and user experience design. Featured in TechCrunch and Wired.',
      icon: Award,
      color: 'from-indigo-500 to-purple-500',
    },
    {
      year: '2024',
      title: 'Innovation Hub',
      description:
        'Opened our innovation lab focused on emerging technologies like AI, blockchain, and AR/VR experiences.',
      icon: TrendingUp,
      color: 'from-pink-500 to-rose-500',
    },
  ]

  const milestones = [
    { number: '500+', label: 'Projects Delivered', icon: Target },
    { number: '200+', label: 'Happy Clients', icon: Heart },
    { number: '25+', label: 'Countries Served', icon: Globe },
    { number: '50+', label: 'Awards Won', icon: Star },
  ]

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white">
      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#9C6BFF]/10 to-[#7C4DFF]/10" />

          <div className="max-w-6xl mx-auto text-center relative z-10">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.div variants={fadeInUp} className="mb-8">
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#9C6BFF] to-[#7C4DFF] rounded-full text-sm font-['Inter'] font-medium mb-4">
                  Our Journey
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-7xl font-bold font-['Space_Grotesk'] mb-8 leading-tight"
              >
                <span className="bg-gradient-to-r from-[#9C6BFF] via-white to-[#7C4DFF] bg-clip-text text-transparent">
                  Our Story
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-xl md:text-2xl text-gray-300 font-['Inter'] leading-relaxed max-w-4xl mx-auto"
              >
                From a small startup to a leading digital agency, discover the journey that shaped
                Growrix into the innovation powerhouse it is today.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* The Beginning */}
        <section className="py-20 px-6 bg-gradient-to-br from-[#181818] to-[#1A1A1A]">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInLeft}
              >
                <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-8 text-white">
                  Where It All Began
                </h2>
                <div className="space-y-6">
                  <p className="text-xl text-gray-300 font-['Inter'] leading-relaxed">
                    In 2019, Sarah Chen and Marcus Rodriguez shared a vision:{' '}
                    <span className="text-[#9C6BFF] font-semibold">
                      transform how businesses connect with their customers through technology.
                    </span>
                  </p>
                  <p className="text-lg text-gray-400 font-['Inter'] leading-relaxed">
                    Working from a small garage in San Francisco, they started with a simple belief
                    that great digital experiences should be accessible to businesses of all sizes.
                    What began as weekend consulting sessions quickly grew into something much
                    bigger.
                  </p>
                  <p className="text-lg text-gray-400 font-['Inter'] leading-relaxed">
                    The name "Growrix" came from their core philosophy: helping businesses{' '}
                    <span className="text-[#7C4DFF] font-semibold">grow</span> through the perfect{' '}
                    <span className="text-[#7C4DFF] font-semibold">mix</span> of creativity,
                    technology, and strategy.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInRight}
                className="relative"
              >
                <div className="bg-gradient-to-br from-[#9C6BFF]/20 to-[#7C4DFF]/20 rounded-3xl p-12 backdrop-blur-xl border border-white/10">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#9C6BFF] to-[#7C4DFF] rounded-full flex items-center justify-center mx-auto mb-6">
                      <Lightbulb className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold font-['Space_Grotesk'] text-white mb-4">
                      The Spark
                    </h3>
                    <p className="text-gray-300 font-['Inter']">
                      "We saw too many great businesses struggling with outdated digital
                      experiences. We knew we could help them compete and thrive."
                    </p>
                    <p className="text-[#9C6BFF] font-['Inter'] mt-4 font-medium">
                      - Sarah Chen, Founder
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-6 bg-gradient-to-r from-[#9C6BFF] to-[#7C4DFF] bg-clip-text text-transparent">
                Our Journey Through Time
              </h2>
              <p className="text-xl text-gray-400 font-['Inter'] max-w-3xl mx-auto">
                Key milestones that shaped our growth and evolution
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#9C6BFF] to-[#7C4DFF]" />

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="space-y-16"
              >
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    variants={fadeInUp}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-gradient-to-br from-[#9C6BFF] to-[#7C4DFF] rounded-full flex items-center justify-center z-10">
                      <item.icon className="w-4 h-4 text-white" />
                    </div>

                    {/* Content */}
                    <div
                      className={`w-full md:w-5/12 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:mr-auto md:pr-16' : 'md:ml-auto md:pl-16'}`}
                    >
                      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-[#9C6BFF]/50 transition-all duration-300">
                        <div
                          className={`inline-block px-3 py-1 bg-gradient-to-r ${item.color} rounded-full text-sm font-medium text-white mb-4`}
                        >
                          {item.year}
                        </div>
                        <h3 className="text-2xl font-bold font-['Space_Grotesk'] mb-4 text-white">
                          {item.title}
                        </h3>
                        <p className="text-gray-400 font-['Inter'] leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Milestones */}
        <section className="py-20 px-6 bg-gradient-to-br from-[#181818] to-[#1A1A1A]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-6 text-white">
                Milestones We're Proud Of
              </h2>
              <p className="text-xl text-gray-400 font-['Inter'] max-w-3xl mx-auto">
                Numbers that reflect our commitment to excellence and growth
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {milestones.map((milestone, index) => (
                <motion.div key={milestone.label} variants={fadeInUp} className="text-center group">
                  <div className="bg-gradient-to-br from-[#9C6BFF]/20 to-[#7C4DFF]/20 rounded-2xl p-8 backdrop-blur-xl border border-white/10 hover:border-[#9C6BFF]/50 transition-all duration-300 group-hover:scale-105">
                    <milestone.icon className="w-12 h-12 text-[#9C6BFF] mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <div className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] text-white mb-2">
                      {milestone.number}
                    </div>
                    <div className="text-gray-400 font-['Inter'] text-sm uppercase tracking-wider">
                      {milestone.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Looking Forward */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInLeft}
                className="relative"
              >
                <div className="bg-gradient-to-br from-[#7C4DFF]/20 to-[#9C6BFF]/20 rounded-3xl p-12 backdrop-blur-xl border border-white/10">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#7C4DFF] to-[#9C6BFF] rounded-full flex items-center justify-center mx-auto mb-6">
                      <Rocket className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold font-['Space_Grotesk'] text-white mb-4">
                      The Future
                    </h3>
                    <p className="text-gray-300 font-['Inter']">
                      "We're just getting started. The next chapter will be even more exciting as we
                      push the boundaries of what's possible."
                    </p>
                    <p className="text-[#7C4DFF] font-['Inter'] mt-4 font-medium">
                      - Marcus Rodriguez, CTO
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInRight}
              >
                <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-8 text-white">
                  What's Next?
                </h2>
                <div className="space-y-6">
                  <p className="text-xl text-gray-300 font-['Inter'] leading-relaxed">
                    As we look toward the future, we're more excited than ever about the
                    possibilities ahead.{' '}
                    <span className="text-[#9C6BFF] font-semibold">
                      AI, sustainable technology, and immersive experiences
                    </span>{' '}
                    are just the beginning.
                  </p>
                  <p className="text-lg text-gray-400 font-['Inter'] leading-relaxed">
                    Our commitment remains the same: helping businesses grow through innovative
                    digital solutions while maintaining the personal touch that has made us who we
                    are today.
                  </p>
                  <div className="bg-gradient-to-r from-[#9C6BFF]/10 to-[#7C4DFF]/10 rounded-xl p-6 border border-[#9C6BFF]/20">
                    <p className="text-[#9C6BFF] font-['Inter'] italic">
                      "Every client we work with becomes part of our story. Together, we're building
                      the future of digital experiences."
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
