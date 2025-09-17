'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/growrix/Navbar'
import Footer from '@/components/growrix/Footer'
import {
  Briefcase,
  TrendingUp,
  Award,
  Users,
  Calendar,
  Globe,
  Smartphone,
  Monitor,
  ArrowRight,
  ExternalLink,
  Star,
  Clock,
  Target,
  Zap,
} from 'lucide-react'

export default function CaseStudiesPage() {
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

  const caseStudies = [
    {
      title: 'E-commerce Platform Redesign',
      client: 'RetailMax Solutions',
      category: 'Web Development',
      duration: '3 months',
      image: '/placeholder.jpg',
      results: [
        { metric: '150%', label: 'Conversion Increase' },
        { metric: '75%', label: 'Page Speed Boost' },
        { metric: '200K+', label: 'Monthly Users' },
      ],
      tags: ['React', 'Node.js', 'AWS', 'PostgreSQL'],
      description:
        'Complete redesign and development of a modern e-commerce platform with advanced features and optimized performance.',
    },
    {
      title: 'Healthcare Mobile App',
      client: 'MedCare Connect',
      category: 'Mobile Development',
      duration: '4 months',
      image: '/placeholder.jpg',
      results: [
        { metric: '50K+', label: 'App Downloads' },
        { metric: '4.8★', label: 'User Rating' },
        { metric: '90%', label: 'User Retention' },
      ],
      tags: ['React Native', 'Firebase', 'TypeScript'],
      description:
        'HIPAA-compliant mobile application connecting patients with healthcare providers for seamless communication.',
    },
    {
      title: 'FinTech Dashboard',
      client: 'InvestPro Analytics',
      category: 'UI/UX Design',
      duration: '2 months',
      image: '/placeholder.jpg',
      results: [
        { metric: '300%', label: 'User Engagement' },
        { metric: '65%', label: 'Task Completion' },
        { metric: '45%', label: 'Support Reduction' },
      ],
      tags: ['Figma', 'React', 'D3.js', 'Material-UI'],
      description:
        'Complete UI/UX redesign of financial analytics dashboard with improved user experience and data visualization.',
    },
    {
      title: 'AI-Powered SaaS Platform',
      client: 'DataFlow Systems',
      category: 'Full Stack',
      duration: '6 months',
      image: '/placeholder.jpg',
      results: [
        { metric: '500%', label: 'Processing Speed' },
        { metric: '99.9%', label: 'Uptime' },
        { metric: '$2M+', label: 'Revenue Generated' },
      ],
      tags: ['Next.js', 'Python', 'TensorFlow', 'Docker'],
      description:
        'End-to-end development of an AI-powered data processing platform with machine learning capabilities.',
    },
    {
      title: 'Educational Platform',
      client: 'EduTech Global',
      category: 'Web Development',
      duration: '5 months',
      image: '/placeholder.jpg',
      results: [
        { metric: '100K+', label: 'Students Enrolled' },
        { metric: '95%', label: 'Course Completion' },
        { metric: '4.9★', label: 'Platform Rating' },
      ],
      tags: ['Vue.js', 'Laravel', 'MySQL', 'Redis'],
      description:
        'Comprehensive learning management system with interactive courses, assessments, and progress tracking.',
    },
    {
      title: 'Real Estate Portal',
      client: 'PropertyHub Pro',
      category: 'Web Development',
      duration: '4 months',
      image: '/placeholder.jpg',
      results: [
        { metric: '250%', label: 'Lead Generation' },
        { metric: '60%', label: 'Search Speed' },
        { metric: '10M+', label: 'Property Views' },
      ],
      tags: ['Angular', 'Express.js', 'MongoDB', 'Elasticsearch'],
      description:
        'Advanced property search and listing platform with map integration and detailed analytics.',
    },
  ]

  const stats = [
    { number: '50+', label: 'Projects Completed', icon: Briefcase },
    { number: '98%', label: 'Client Satisfaction', icon: Star },
    { number: '180%', label: 'Avg. ROI Increase', icon: TrendingUp },
    { number: '24/7', label: 'Support Available', icon: Clock },
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
                  Success Stories
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-7xl font-bold font-['Space_Grotesk'] mb-8 leading-tight"
              >
                <span className="bg-gradient-to-r from-[#9C6BFF] via-white to-[#7C4DFF] bg-clip-text text-transparent">
                  Case Studies
                </span>
                <br />
                <span className="text-white">& Success Stories</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-xl md:text-2xl text-gray-300 font-['Inter'] leading-relaxed max-w-4xl mx-auto mb-12"
              >
                Discover how we've helped businesses transform their digital presence and achieve
                remarkable results through innovative solutions.
              </motion.p>

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

        {/* Case Studies Grid */}
        <section className="py-20 px-6 bg-gradient-to-br from-[#181818] to-[#1A1A1A]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {caseStudies.map((study, index) => (
                <motion.div
                  key={study.title}
                  variants={fadeInUp}
                  className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-[#9C6BFF]/50 transition-all duration-300 group"
                >
                  {/* Image placeholder */}
                  <div className="h-48 bg-gradient-to-br from-[#9C6BFF]/20 to-[#7C4DFF]/20 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Monitor className="w-16 h-16 text-[#9C6BFF]/50" />
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-[#9C6BFF] px-3 py-1 rounded-full text-xs font-['Inter'] font-medium">
                        {study.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold font-['Space_Grotesk'] text-white group-hover:text-[#9C6BFF] transition-colors">
                        {study.title}
                      </h3>
                      <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-[#9C6BFF] transition-colors" />
                    </div>

                    <div className="flex items-center space-x-4 mb-4 text-sm text-gray-400 font-['Inter']">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{study.client}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{study.duration}</span>
                      </div>
                    </div>

                    <p className="text-gray-300 font-['Inter'] leading-relaxed mb-6">
                      {study.description}
                    </p>

                    {/* Results */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {study.results.map((result, resultIndex) => (
                        <div key={resultIndex} className="text-center">
                          <div className="text-2xl font-bold font-['Space_Grotesk'] text-[#9C6BFF] mb-1">
                            {result.metric}
                          </div>
                          <div className="text-xs text-gray-400 font-['Inter']">{result.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {study.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-[#9C6BFF]/10 border border-[#9C6BFF]/20 rounded-full text-xs font-['Inter'] text-[#9C6BFF]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
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
                Ready to Create Your Success Story?
              </h2>
              <p className="text-xl text-gray-400 font-['Inter'] mb-10 leading-relaxed">
                Let's discuss how we can help you achieve similar results and transform your digital
                presence.
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
