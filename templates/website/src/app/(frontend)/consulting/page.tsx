'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/growrix/Navbar'
import Footer from '@/components/growrix/Footer'
import {
  TrendingUp,
  Target,
  BarChart,
  Users,
  Lightbulb,
  Briefcase,
  PieChart,
  LineChart,
  Zap,
  Shield,
  Globe,
  Settings,
  CheckCircle,
  ArrowRight,
  Star,
  Award,
  Clock,
  DollarSign,
} from 'lucide-react'

export default function ConsultingPage() {
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
      icon: TrendingUp,
      title: 'Digital Strategy',
      description:
        'Comprehensive digital transformation strategies that align with your business goals.',
      features: ['Market Analysis', 'Technology Roadmap', 'Growth Strategy', 'ROI Planning'],
    },
    {
      icon: BarChart,
      title: 'Performance Optimization',
      description:
        'Analyze and optimize your digital presence for maximum performance and conversion.',
      features: ['Website Audits', 'Speed Optimization', 'SEO Strategy', 'Analytics Setup'],
    },
    {
      icon: Users,
      title: 'Team Training',
      description: 'Upskill your team with modern technologies and best practices.',
      features: ['Technical Training', 'Workshops', 'Best Practices', 'Knowledge Transfer'],
    },
    {
      icon: Briefcase,
      title: 'Project Management',
      description:
        'Expert project management to ensure successful delivery of your digital initiatives.',
      features: ['Agile Methodology', 'Risk Management', 'Quality Assurance', 'Timeline Planning'],
    },
  ]

  const process = [
    {
      step: '01',
      title: 'Assessment',
      description: 'Deep dive into your current state and identify opportunities',
      icon: Target,
    },
    {
      step: '02',
      title: 'Strategy',
      description: 'Develop a comprehensive plan tailored to your goals',
      icon: Lightbulb,
    },
    {
      step: '03',
      title: 'Implementation',
      description: 'Execute the strategy with ongoing support and guidance',
      icon: Settings,
    },
    {
      step: '04',
      title: 'Optimization',
      description: 'Monitor, measure, and continuously improve performance',
      icon: TrendingUp,
    },
  ]

  const stats = [
    { number: '50+', label: 'Companies Advised', icon: Briefcase },
    { number: '85%', label: 'Revenue Growth', icon: DollarSign },
    { number: '48hrs', label: 'Avg. Response Time', icon: Clock },
    { number: '4.9★', label: 'Client Rating', icon: Star },
  ]

  const benefits = [
    {
      icon: Target,
      title: 'Strategic Focus',
      description:
        'Get clear direction with data-driven strategies that align with your business objectives.',
    },
    {
      icon: Zap,
      title: 'Faster Results',
      description:
        'Accelerate your digital transformation with proven methodologies and expert guidance.',
    },
    {
      icon: Shield,
      title: 'Risk Mitigation',
      description:
        'Avoid common pitfalls with our extensive experience and proactive risk management.',
    },
    {
      icon: Globe,
      title: 'Industry Expertise',
      description: 'Benefit from our deep knowledge across multiple industries and technologies.',
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
                  Strategic Consulting
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-7xl font-bold font-['Space_Grotesk'] mb-8 leading-tight"
              >
                <span className="bg-gradient-to-r from-[#9C6BFF] via-white to-[#7C4DFF] bg-clip-text text-transparent">
                  Strategic
                </span>
                <br />
                <span className="text-white">Technology Consulting</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-xl md:text-2xl text-gray-300 font-['Inter'] leading-relaxed max-w-4xl mx-auto mb-12"
              >
                Transform your business with expert technology consulting. We help you navigate
                digital transformation, optimize performance, and achieve sustainable growth.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-6 mb-16">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(156, 107, 255, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#9C6BFF] to-[#7C4DFF] px-8 py-4 rounded-xl font-['Inter'] font-bold text-lg inline-flex items-center space-x-3 hover:shadow-2xl transition-all"
                >
                  <span>Book Consultation</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-[#9C6BFF] px-8 py-4 rounded-xl font-['Inter'] font-bold text-lg hover:bg-[#9C6BFF]/10 transition-all"
                >
                  View Case Studies
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
                Consulting Services
              </h2>
              <p className="text-xl text-gray-400 font-['Inter'] max-w-3xl mx-auto">
                Expert guidance to accelerate your digital transformation journey
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

        {/* Process */}
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
                Our Consulting Process
              </h2>
              <p className="text-xl text-gray-400 font-['Inter'] max-w-3xl mx-auto">
                A structured approach that delivers measurable results
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {process.map((step, index) => (
                <motion.div key={step.step} variants={fadeInUp} className="text-center group">
                  <div className="bg-gradient-to-br from-[#9C6BFF] to-[#7C4DFF] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-sm font-['Inter'] text-[#9C6BFF] font-bold mb-2">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold font-['Space_Grotesk'] mb-4 text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 font-['Inter'] text-sm leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Benefits */}
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
                Why Choose Our Consulting
              </h2>
              <p className="text-xl text-gray-400 font-['Inter'] max-w-3xl mx-auto">
                Partner with experts who deliver real value and measurable results
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  variants={fadeInUp}
                  className="flex items-start space-x-6 p-6 bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-[#9C6BFF]/50 transition-all duration-300"
                >
                  <benefit.icon className="w-12 h-12 text-[#9C6BFF] flex-shrink-0 mt-2" />
                  <div>
                    <h3 className="text-xl font-bold font-['Space_Grotesk'] mb-3 text-white">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-400 font-['Inter'] leading-relaxed">
                      {benefit.description}
                    </p>
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
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-gray-400 font-['Inter'] mb-10 leading-relaxed">
                Let's discuss how our strategic consulting can accelerate your digital
                transformation and drive growth.
              </p>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(156, 107, 255, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#9C6BFF] to-[#7C4DFF] px-10 py-5 rounded-xl font-['Inter'] font-bold text-lg inline-flex items-center space-x-3 hover:shadow-2xl transition-all"
              >
                <span>Schedule Free Consultation</span>
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
