'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/growrix/Navbar'
import Footer from '@/components/growrix/Footer'
import {
  Smartphone,
  Tablet,
  Download,
  Star,
  Users,
  Zap,
  Shield,
  Globe,
  Code,
  Palette,
  Database,
  Cloud,
  CheckCircle,
  ArrowRight,
  Play,
  Apple,
} from 'lucide-react'

export default function MobileAppsPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
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

  const services = [
    {
      icon: Smartphone,
      title: 'Native iOS Development',
      description:
        'High-performance iOS apps built with Swift and SwiftUI for optimal user experience.',
      features: ['Swift/SwiftUI', 'Core Data', 'ARKit Integration', 'App Store Optimization'],
    },
    {
      icon: Play,
      title: 'Native Android Development',
      description:
        'Feature-rich Android applications using Kotlin and modern Android architecture.',
      features: ['Kotlin/Java', 'Jetpack Compose', 'Material Design', 'Google Play Store'],
    },
    {
      icon: Code,
      title: 'Cross-Platform Apps',
      description: 'Cost-effective solutions with React Native and Flutter for multiple platforms.',
      features: ['React Native', 'Flutter', 'Shared Codebase', 'Platform-specific UI'],
    },
    {
      icon: Globe,
      title: 'Progressive Web Apps',
      description: 'Web applications that feel like native apps with offline capabilities.',
      features: ['Service Workers', 'Offline Mode', 'Push Notifications', 'App-like Experience'],
    },
  ]

  const stats = [
    { number: '200+', label: 'Apps Launched', icon: Download },
    { number: '4.8★', label: 'Average Rating', icon: Star },
    { number: '1M+', label: 'Downloads', icon: Users },
    { number: '50+', label: 'App Store Features', icon: Zap },
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
                  Mobile App Development
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-7xl font-bold font-['Space_Grotesk'] mb-8 leading-tight"
              >
                <span className="bg-gradient-to-r from-[#9C6BFF] via-white to-[#7C4DFF] bg-clip-text text-transparent">
                  Mobile Apps
                </span>
                <br />
                <span className="text-white">That Users Love</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-xl md:text-2xl text-gray-300 font-['Inter'] leading-relaxed max-w-4xl mx-auto mb-12"
              >
                We create stunning mobile applications for iOS and Android that engage users and
                drive business growth. From concept to App Store, we handle it all.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-6 mb-16">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(156, 107, 255, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#9C6BFF] to-[#7C4DFF] px-8 py-4 rounded-xl font-['Inter'] font-bold text-lg inline-flex items-center space-x-3 hover:shadow-2xl transition-all"
                >
                  <span>Start Your App</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-[#9C6BFF] px-8 py-4 rounded-xl font-['Inter'] font-bold text-lg hover:bg-[#9C6BFF]/10 transition-all"
                >
                  View Portfolio
                </motion.button>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={fadeInUp}
                className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
              >
                {stats.map((stat, index) => (
                  <div key={stat.label} className="text-center">
                    <stat.icon className="w-8 h-8 text-[#9C6BFF] mx-auto mb-2" />
                    <div className="text-3xl md:text-4xl font-bold font-['Space_Grotesk'] text-white mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-400 font-['Inter']">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Services */}
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
                Mobile Development Services
              </h2>
              <p className="text-xl text-gray-400 font-['Inter'] max-w-3xl mx-auto">
                Comprehensive mobile solutions for every platform and business need
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  variants={fadeInUp}
                  className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-[#9C6BFF]/50 transition-all duration-300 group"
                >
                  <service.icon className="w-12 h-12 text-[#9C6BFF] mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold font-['Space_Grotesk'] mb-4 text-white">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 font-['Inter'] leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-[#9C6BFF]" />
                        <span className="text-gray-300 font-['Inter'] text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-6 text-white">
                Ready to Launch Your App?
              </h2>
              <p className="text-xl text-gray-400 font-['Inter'] mb-10 leading-relaxed">
                Transform your idea into a successful mobile application that users will love.
              </p>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(156, 107, 255, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#9C6BFF] to-[#7C4DFF] px-10 py-5 rounded-xl font-['Inter'] font-bold text-lg inline-flex items-center space-x-3 hover:shadow-2xl transition-all"
              >
                <span>Get Started Today</span>
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
