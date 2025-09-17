'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/growrix/Navbar'
import Footer from '@/components/growrix/Footer'
import {
  Globe,
  Smartphone,
  Layers,
  Code,
  Bot,
  Monitor,
  Lightbulb,
  TrendingUp,
  Users,
  Zap,
  ArrowRight,
  Star,
  Award,
  CheckCircle,
  Rocket,
  Target,
  Heart,
  Clock,
  Shield,
} from 'lucide-react'

export default function AboutUsPage() {
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

  const team = [
    {
      name: 'Sarah Chen',
      role: 'Founder & CEO',
      image: '/api/placeholder/300/300',
      bio: 'Visionary leader with 15+ years in digital transformation and startup growth.',
    },
    {
      name: 'Marcus Rodriguez',
      role: 'CTO',
      image: '/api/placeholder/300/300',
      bio: 'Full-stack architect passionate about scalable solutions and emerging technologies.',
    },
    {
      name: 'Emily Watson',
      role: 'Head of Design',
      image: '/api/placeholder/300/300',
      bio: 'Award-winning designer crafting beautiful, user-centered digital experiences.',
    },
    {
      name: 'David Kim',
      role: 'Lead Developer',
      image: '/api/placeholder/300/300',
      bio: 'Expert in modern web technologies with a focus on performance and accessibility.',
    },
  ]

  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation First',
      description:
        'We embrace cutting-edge technologies and creative solutions to solve complex challenges.',
    },
    {
      icon: Users,
      title: 'Client Partnership',
      description:
        'Your success is our mission. We work as an extension of your team to achieve shared goals.',
    },
    {
      icon: Target,
      title: 'Quality Driven',
      description:
        'Excellence in every detail, from initial concept to final deployment and beyond.',
    },
    {
      icon: Heart,
      title: 'Passion & Purpose',
      description:
        'We love what we do and believe technology should make the world a better place.',
    },
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
                  About Growrix
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-7xl font-bold font-['Space_Grotesk'] mb-8 leading-tight"
              >
                <span className="bg-gradient-to-r from-[#9C6BFF] via-white to-[#7C4DFF] bg-clip-text text-transparent">
                  Building Tomorrow's Digital Experiences
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-xl md:text-2xl text-gray-300 font-['Inter'] leading-relaxed max-w-4xl mx-auto"
              >
                We're a passionate team of designers, developers, and strategists who believe
                technology should empower businesses and delight users. Since 2019, we've been
                crafting digital solutions that drive growth and create meaningful connections.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 px-6 bg-gradient-to-br from-[#181818] to-[#1A1A1A]">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInLeft}
                className="relative"
              >
                <div className="bg-gradient-to-br from-[#9C6BFF]/20 to-[#7C4DFF]/20 rounded-3xl p-8 md:p-12 backdrop-blur-xl border border-white/10">
                  <Target className="w-16 h-16 text-[#9C6BFF] mb-8" />
                  <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-6 text-white">
                    Our Mission
                  </h2>
                  <p className="text-xl text-gray-300 font-['Inter'] leading-relaxed">
                    To empower businesses through innovative digital solutions that drive growth,
                    enhance user experiences, and create lasting value in an ever-evolving digital
                    landscape.
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
                <div className="bg-gradient-to-br from-[#7C4DFF]/20 to-[#9C6BFF]/20 rounded-3xl p-8 md:p-12 backdrop-blur-xl border border-white/10">
                  <Rocket className="w-16 h-16 text-[#7C4DFF] mb-8" />
                  <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-6 text-white">
                    Our Vision
                  </h2>
                  <p className="text-xl text-gray-300 font-['Inter'] leading-relaxed">
                    To be the leading digital transformation partner, recognized for our innovation,
                    quality, and commitment to helping businesses thrive in the digital age.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-6 bg-gradient-to-r from-[#9C6BFF] to-[#7C4DFF] bg-clip-text text-transparent">
                Our Values
              </h2>
              <p className="text-xl text-gray-400 font-['Inter'] max-w-3xl mx-auto">
                The principles that guide everything we do
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  variants={fadeInUp}
                  className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-[#9C6BFF]/50 transition-all duration-300"
                >
                  <value.icon className="w-12 h-12 text-[#9C6BFF] mb-6" />
                  <h3 className="text-2xl font-bold font-['Space_Grotesk'] mb-4 text-white">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 font-['Inter'] leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
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
                Meet Our Team
              </h2>
              <p className="text-xl text-gray-400 font-['Inter'] max-w-3xl mx-auto">
                The passionate individuals behind Growrix's success
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {team.map((member, index) => (
                <motion.div key={member.name} variants={fadeInUp} className="group text-center">
                  <div className="relative mb-6 overflow-hidden rounded-2xl">
                    <div className="aspect-square bg-gradient-to-br from-[#9C6BFF]/20 to-[#7C4DFF]/20 rounded-2xl flex items-center justify-center">
                      <Users className="w-16 h-16 text-[#9C6BFF]" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-xl font-bold font-['Space_Grotesk'] mb-2 text-white">
                    {member.name}
                  </h3>
                  <p className="text-[#9C6BFF] font-['Inter'] font-medium mb-3">{member.role}</p>
                  <p className="text-gray-400 font-['Inter'] text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {[
                { number: '500+', label: 'Projects Completed', icon: Rocket },
                { number: '200+', label: 'Happy Clients', icon: Users },
                { number: '5+', label: 'Years Experience', icon: Clock },
                { number: '99%', label: 'Client Satisfaction', icon: Award },
              ].map((stat, index) => (
                <motion.div key={stat.label} variants={fadeInUp} className="text-center group">
                  <div className="bg-gradient-to-br from-[#9C6BFF]/20 to-[#7C4DFF]/20 rounded-2xl p-8 backdrop-blur-xl border border-white/10 hover:border-[#9C6BFF]/50 transition-all duration-300">
                    <stat.icon className="w-12 h-12 text-[#9C6BFF] mx-auto mb-4" />
                    <div className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] text-white mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-400 font-['Inter'] text-sm uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-[#181818] to-[#1A1A1A]">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-6 text-white">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-gray-400 font-['Inter'] mb-10 leading-relaxed">
                Let's discuss how we can help you achieve your digital goals and create something
                extraordinary together.
              </p>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(156, 107, 255, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#9C6BFF] to-[#7C4DFF] px-10 py-5 rounded-xl font-['Inter'] font-bold text-lg inline-flex items-center space-x-3 hover:shadow-2xl transition-all"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
