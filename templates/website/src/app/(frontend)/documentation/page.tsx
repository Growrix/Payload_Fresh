'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/growrix/Navbar'
import Footer from '@/components/growrix/Footer'
import {
  BookOpen,
  Code,
  Smartphone,
  Palette,
  Settings,
  Download,
  Search,
  Star,
  Clock,
  Users,
  FileText,
  Video,
  ExternalLink,
  ArrowRight,
  Play,
  GitBranch,
  Terminal,
  Database,
} from 'lucide-react'

export default function DocumentationPage() {
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

  const categories = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Comprehensive guides for modern web development',
      count: '25+ guides',
      topics: ['React/Next.js', 'Node.js/Express', 'TypeScript', 'API Design'],
    },
    {
      icon: Smartphone,
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile app development',
      count: '18+ guides',
      topics: ['React Native', 'Flutter', 'iOS/Swift', 'Android/Kotlin'],
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Design principles and best practices',
      count: '20+ guides',
      topics: ['Design Systems', 'Figma', 'User Research', 'Prototyping'],
    },
    {
      icon: Settings,
      title: 'DevOps & Deployment',
      description: 'Infrastructure and deployment strategies',
      count: '15+ guides',
      topics: ['AWS/Cloud', 'Docker/K8s', 'CI/CD', 'Monitoring'],
    },
  ]

  const popularGuides = [
    {
      title: 'Complete React/Next.js Guide',
      description: 'Master modern React development with Next.js 14+',
      readTime: '45 min read',
      difficulty: 'Intermediate',
      tags: ['React', 'Next.js', 'TypeScript'],
      icon: Code,
    },
    {
      title: 'Mobile App Architecture',
      description: 'Best practices for scalable mobile app development',
      readTime: '30 min read',
      difficulty: 'Advanced',
      tags: ['Architecture', 'React Native', 'Performance'],
      icon: Smartphone,
    },
    {
      title: 'Design System Creation',
      description: 'Build consistent and scalable design systems',
      readTime: '25 min read',
      difficulty: 'Beginner',
      tags: ['Design Systems', 'Figma', 'Components'],
      icon: Palette,
    },
    {
      title: 'API Security Best Practices',
      description: 'Secure your APIs with industry standards',
      readTime: '35 min read',
      difficulty: 'Intermediate',
      tags: ['Security', 'API', 'Authentication'],
      icon: Settings,
    },
  ]

  const resources = [
    {
      icon: Download,
      title: 'Starter Templates',
      description: 'Ready-to-use project templates',
      count: '12 templates',
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Step-by-step video guides',
      count: '50+ videos',
    },
    {
      icon: GitBranch,
      title: 'Code Examples',
      description: 'Working code samples',
      count: '100+ examples',
    },
    {
      icon: Terminal,
      title: 'CLI Tools',
      description: 'Development utilities',
      count: '8 tools',
    },
  ]

  const stats = [
    { number: '100+', label: 'Documentation Pages', icon: BookOpen },
    { number: '50K+', label: 'Monthly Readers', icon: Users },
    { number: '4.8★', label: 'User Rating', icon: Star },
    { number: '24/7', label: 'Updated', icon: Clock },
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
                  Knowledge Base
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-7xl font-bold font-['Space_Grotesk'] mb-8 leading-tight"
              >
                <span className="bg-gradient-to-r from-[#9C6BFF] via-white to-[#7C4DFF] bg-clip-text text-transparent">
                  Documentation
                </span>
                <br />
                <span className="text-white">& Learning Resources</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-xl md:text-2xl text-gray-300 font-['Inter'] leading-relaxed max-w-4xl mx-auto mb-12"
              >
                Comprehensive guides, tutorials, and resources to help you master modern development
                technologies and best practices.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-6 mb-16">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(156, 107, 255, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#9C6BFF] to-[#7C4DFF] px-8 py-4 rounded-xl font-['Inter'] font-bold text-lg inline-flex items-center space-x-3 hover:shadow-2xl transition-all"
                >
                  <Search className="w-5 h-5" />
                  <span>Search Docs</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-[#9C6BFF] px-8 py-4 rounded-xl font-['Inter'] font-bold text-lg hover:bg-[#9C6BFF]/10 transition-all"
                >
                  Browse Categories
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

        {/* Categories */}
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
                Documentation Categories
              </h2>
              <p className="text-xl text-gray-400 font-['Inter'] max-w-3xl mx-auto">
                Explore our comprehensive documentation organized by technology and expertise level
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {categories.map((category, index) => (
                <motion.div
                  key={category.title}
                  variants={fadeInUp}
                  className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-[#9C6BFF]/50 transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-6">
                    <category.icon className="w-12 h-12 text-[#9C6BFF] group-hover:scale-110 transition-transform" />
                    <span className="text-sm text-gray-400 font-['Inter']">{category.count}</span>
                  </div>
                  <h3 className="text-2xl font-bold font-['Space_Grotesk'] mb-4 text-white group-hover:text-[#9C6BFF] transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-gray-400 font-['Inter'] leading-relaxed mb-6">
                    {category.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {category.topics.map((topic, topicIndex) => (
                      <span
                        key={topicIndex}
                        className="px-3 py-1 bg-[#9C6BFF]/10 border border-[#9C6BFF]/20 rounded-full text-xs font-['Inter'] text-[#9C6BFF]"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Popular Guides */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-6 text-white">
                Popular Guides
              </h2>
              <p className="text-xl text-gray-400 font-['Inter'] max-w-3xl mx-auto">
                Most accessed tutorials and guides by our community
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {popularGuides.map((guide, index) => (
                <motion.div
                  key={guide.title}
                  variants={fadeInUp}
                  className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-[#9C6BFF]/50 transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-start space-x-4">
                    <guide.icon className="w-12 h-12 text-[#9C6BFF] flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold font-['Space_Grotesk'] text-white group-hover:text-[#9C6BFF] transition-colors">
                          {guide.title}
                        </h3>
                        <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-[#9C6BFF] transition-colors" />
                      </div>
                      <p className="text-gray-400 font-['Inter'] text-sm leading-relaxed mb-4">
                        {guide.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs text-gray-500 font-['Inter']">
                          <span>{guide.readTime}</span>
                          <span className="bg-[#9C6BFF]/20 px-2 py-1 rounded text-[#9C6BFF]">
                            {guide.difficulty}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {guide.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-[#9C6BFF]/10 border border-[#9C6BFF]/20 rounded text-xs font-['Inter'] text-[#9C6BFF]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Resources */}
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
                Additional Resources
              </h2>
              <p className="text-xl text-gray-400 font-['Inter'] max-w-3xl mx-auto">
                Tools, templates, and resources to accelerate your development
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {resources.map((resource, index) => (
                <motion.div
                  key={resource.title}
                  variants={fadeInUp}
                  className="text-center group cursor-pointer"
                >
                  <div className="bg-gradient-to-br from-[#9C6BFF] to-[#7C4DFF] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <resource.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold font-['Space_Grotesk'] mb-2 text-white group-hover:text-[#9C6BFF] transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-gray-400 font-['Inter'] text-sm mb-2">
                    {resource.description}
                  </p>
                  <span className="text-xs text-[#9C6BFF] font-['Inter'] font-medium">
                    {resource.count}
                  </span>
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
                Can't Find What You're Looking For?
              </h2>
              <p className="text-xl text-gray-400 font-['Inter'] mb-10 leading-relaxed">
                Contact our team for personalized guidance and support for your specific needs.
              </p>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(156, 107, 255, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#9C6BFF] to-[#7C4DFF] px-10 py-5 rounded-xl font-['Inter'] font-bold text-lg inline-flex items-center space-x-3 hover:shadow-2xl transition-all"
              >
                <span>Contact Support</span>
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
