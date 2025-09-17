'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/growrix/Navbar'
import Footer from '@/components/growrix/Footer'
import {
  Code,
  Globe,
  Smartphone,
  Layers,
  Database,
  Shield,
  Zap,
  Users,
  CheckCircle,
  ArrowRight,
  Monitor,
  Cloud,
  Cpu,
  Lock,
  Gauge,
  Palette,
} from 'lucide-react'

export default function WebDevelopmentPage() {
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

  const services = [
    {
      icon: Globe,
      title: 'Custom Web Applications',
      description:
        'Scalable, high-performance web applications built with modern frameworks like React, Vue, and Angular.',
      features: [
        'Responsive Design',
        'Progressive Web Apps',
        'Real-time Features',
        'API Integration',
      ],
    },
    {
      icon: Database,
      title: 'Backend Development',
      description:
        'Robust server-side solutions with Node.js, Python, and cloud-native architectures.',
      features: ['RESTful APIs', 'GraphQL', 'Microservices', 'Database Design'],
    },
    {
      icon: Cloud,
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure on AWS, Azure, and Google Cloud Platform.',
      features: ['Auto-scaling', 'Load Balancing', 'CDN Setup', 'DevOps Pipeline'],
    },
    {
      icon: Shield,
      title: 'Security & Performance',
      description: 'Enterprise-grade security and optimization for maximum performance.',
      features: ['SSL/TLS', 'GDPR Compliance', 'Performance Monitoring', 'Security Audits'],
    },
  ]

  const technologies = [
    { name: 'React', category: 'Frontend', color: 'from-blue-500 to-cyan-500' },
    { name: 'Node.js', category: 'Backend', color: 'from-green-500 to-teal-500' },
    { name: 'TypeScript', category: 'Language', color: 'from-blue-600 to-blue-400' },
    { name: 'Next.js', category: 'Framework', color: 'from-black to-gray-600' },
    { name: 'AWS', category: 'Cloud', color: 'from-orange-500 to-yellow-500' },
    { name: 'MongoDB', category: 'Database', color: 'from-green-600 to-green-400' },
    { name: 'PostgreSQL', category: 'Database', color: 'from-blue-700 to-blue-500' },
    { name: 'Docker', category: 'DevOps', color: 'from-blue-500 to-blue-700' },
  ]

  const process = [
    {
      step: '01',
      title: 'Discovery & Planning',
      description:
        'We dive deep into your requirements, goals, and technical constraints to create a comprehensive project roadmap.',
      icon: Users,
    },
    {
      step: '02',
      title: 'Design & Architecture',
      description:
        'Our team designs the user experience and technical architecture to ensure scalability and performance.',
      icon: Palette,
    },
    {
      step: '03',
      title: 'Development & Testing',
      description:
        'Agile development with continuous testing, code reviews, and quality assurance throughout the process.',
      icon: Code,
    },
    {
      step: '04',
      title: 'Deployment & Support',
      description:
        'Seamless deployment to production with ongoing maintenance, monitoring, and support.',
      icon: Cloud,
    },
  ]

  const benefits = [
    {
      icon: Gauge,
      title: 'Lightning Fast',
      description:
        'Optimized for speed with advanced caching, CDN integration, and performance monitoring.',
    },
    {
      icon: Lock,
      title: 'Secure by Design',
      description:
        'Enterprise-grade security measures including encryption, authentication, and regular audits.',
    },
    {
      icon: Layers,
      title: 'Scalable Architecture',
      description:
        'Built to grow with your business using microservices and cloud-native technologies.',
    },
    {
      icon: Smartphone,
      title: 'Mobile-First',
      description:
        'Responsive design ensuring perfect experiences across all devices and screen sizes.',
    },
  ]

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white">
      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#9C6BFF]/10 to-[#7C4DFF]/10" />

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
                <motion.div variants={fadeInUp} className="mb-8">
                  <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#9C6BFF] to-[#7C4DFF] rounded-full text-sm font-['Inter'] font-medium mb-4">
                    Web Development Services
                  </span>
                </motion.div>

                <motion.h1
                  variants={fadeInUp}
                  className="text-5xl md:text-6xl font-bold font-['Space_Grotesk'] mb-8 leading-tight"
                >
                  <span className="bg-gradient-to-r from-[#9C6BFF] via-white to-[#7C4DFF] bg-clip-text text-transparent">
                    Custom Web
                  </span>
                  <br />
                  <span className="text-white">Development</span>
                </motion.h1>

                <motion.p
                  variants={fadeInUp}
                  className="text-xl text-gray-300 font-['Inter'] leading-relaxed mb-8"
                >
                  We build powerful, scalable web applications that drive business growth. From
                  concept to deployment, our expert team delivers solutions that exceed
                  expectations.
                </motion.p>

                <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(156, 107, 255, 0.3)' }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-[#9C6BFF] to-[#7C4DFF] px-8 py-4 rounded-xl font-['Inter'] font-bold text-lg inline-flex items-center space-x-3 hover:shadow-2xl transition-all"
                  >
                    <span>Start Your Project</span>
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
              </motion.div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInRight}
                className="relative"
              >
                <div className="bg-gradient-to-br from-[#9C6BFF]/20 to-[#7C4DFF]/20 rounded-3xl p-12 backdrop-blur-xl border border-white/10">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="text-center">
                      <Monitor className="w-16 h-16 text-[#9C6BFF] mx-auto mb-4" />
                      <div className="text-3xl font-bold font-['Space_Grotesk'] text-white mb-2">
                        500+
                      </div>
                      <div className="text-gray-400 font-['Inter'] text-sm">Websites Built</div>
                    </div>
                    <div className="text-center">
                      <Cpu className="w-16 h-16 text-[#7C4DFF] mx-auto mb-4" />
                      <div className="text-3xl font-bold font-['Space_Grotesk'] text-white mb-2">
                        99.9%
                      </div>
                      <div className="text-gray-400 font-['Inter'] text-sm">Uptime SLA</div>
                    </div>
                    <div className="text-center">
                      <Zap className="w-16 h-16 text-[#9C6BFF] mx-auto mb-4" />
                      <div className="text-3xl font-bold font-['Space_Grotesk'] text-white mb-2">
                        &lt;2s
                      </div>
                      <div className="text-gray-400 font-['Inter'] text-sm">Load Time</div>
                    </div>
                    <div className="text-center">
                      <Globe className="w-16 h-16 text-[#7C4DFF] mx-auto mb-4" />
                      <div className="text-3xl font-bold font-['Space_Grotesk'] text-white mb-2">
                        25+
                      </div>
                      <div className="text-gray-400 font-['Inter'] text-sm">Countries</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Overview */}
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
                What We Build
              </h2>
              <p className="text-xl text-gray-400 font-['Inter'] max-w-3xl mx-auto">
                From simple websites to complex enterprise applications, we deliver solutions that
                scale
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

        {/* Technologies */}
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
                Technologies We Use
              </h2>
              <p className="text-xl text-gray-400 font-['Inter'] max-w-3xl mx-auto">
                We stay current with the latest technologies to deliver cutting-edge solutions
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {technologies.map((tech, index) => (
                <motion.div key={tech.name} variants={fadeInUp} className="group text-center">
                  <div
                    className={`bg-gradient-to-br ${tech.color} rounded-xl p-6 mb-4 group-hover:scale-105 transition-transform`}
                  >
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto backdrop-blur-sm">
                      <Code className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold font-['Space_Grotesk'] text-white mb-1">
                    {tech.name}
                  </h3>
                  <p className="text-gray-400 font-['Inter'] text-sm">{tech.category}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Process */}
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
                Our Process
              </h2>
              <p className="text-xl text-gray-400 font-['Inter'] max-w-3xl mx-auto">
                A proven methodology that ensures successful project delivery
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-8"
            >
              {process.map((step, index) => (
                <motion.div
                  key={step.step}
                  variants={index % 2 === 0 ? fadeInLeft : fadeInRight}
                  className={`flex items-center gap-8 ${index % 2 !== 0 ? 'flex-row-reverse' : ''}`}
                >
                  <div className="flex-1">
                    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-[#9C6BFF]/50 transition-all duration-300">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#9C6BFF] to-[#7C4DFF] rounded-xl flex items-center justify-center flex-shrink-0">
                          <step.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-3">
                            <span className="text-2xl font-bold font-['Space_Grotesk'] text-[#9C6BFF]">
                              {step.step}
                            </span>
                            <h3 className="text-2xl font-bold font-['Space_Grotesk'] text-white">
                              {step.title}
                            </h3>
                          </div>
                          <p className="text-gray-400 font-['Inter'] leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Benefits */}
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
                Why Choose Our Development?
              </h2>
              <p className="text-xl text-gray-400 font-['Inter'] max-w-3xl mx-auto">
                The benefits that set our web development services apart
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {benefits.map((benefit, index) => (
                <motion.div key={benefit.title} variants={fadeInUp} className="text-center group">
                  <div className="bg-gradient-to-br from-[#9C6BFF]/20 to-[#7C4DFF]/20 rounded-2xl p-8 backdrop-blur-xl border border-white/10 hover:border-[#9C6BFF]/50 transition-all duration-300 group-hover:scale-105">
                    <benefit.icon className="w-12 h-12 text-[#9C6BFF] mx-auto mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold font-['Space_Grotesk'] mb-3 text-white">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-400 font-['Inter'] text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 bg-gradient-to-br from-[#181818] to-[#1A1A1A]">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-6 text-white">
                Ready to Build Something Amazing?
              </h2>
              <p className="text-xl text-gray-400 font-['Inter'] mb-10 leading-relaxed">
                Let's discuss your project and create a web solution that drives your business
                forward.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(156, 107, 255, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#9C6BFF] to-[#7C4DFF] px-10 py-5 rounded-xl font-['Inter'] font-bold text-lg inline-flex items-center space-x-3 hover:shadow-2xl transition-all"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-[#9C6BFF] px-10 py-5 rounded-xl font-['Inter'] font-bold text-lg hover:bg-[#9C6BFF]/10 transition-all"
                >
                  Schedule Consultation
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
