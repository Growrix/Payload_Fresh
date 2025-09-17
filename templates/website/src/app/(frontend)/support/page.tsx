'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/growrix/Navbar'
import Footer from '@/components/growrix/Footer'
import {
  Headphones,
  MessageCircle,
  Mail,
  Phone,
  Clock,
  Star,
  Users,
  CheckCircle,
  ArrowRight,
  Book,
  Video,
  FileText,
  Search,
  Zap,
  Shield,
  Heart,
  Award,
} from 'lucide-react'

export default function SupportPage() {
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

  const supportChannels = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      availability: '24/7 Available',
      responseTime: '< 2 minutes',
      action: 'Start Chat',
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Detailed assistance for complex issues',
      availability: 'Business Hours',
      responseTime: '< 4 hours',
      action: 'Send Email',
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Direct line to our technical experts',
      availability: 'Mon-Fri 9AM-6PM',
      responseTime: 'Immediate',
      action: 'Call Now',
    },
    {
      icon: Book,
      title: 'Knowledge Base',
      description: 'Self-service guides and tutorials',
      availability: 'Always Available',
      responseTime: 'Instant',
      action: 'Browse Docs',
    },
  ]

  const supportPlans = [
    {
      name: 'Basic Support',
      price: 'Free',
      description: 'Essential support for getting started',
      features: [
        'Community forum access',
        'Documentation access',
        'Email support (48h response)',
        'Basic troubleshooting guides',
      ],
    },
    {
      name: 'Priority Support',
      price: '$99/month',
      description: 'Enhanced support for growing businesses',
      features: [
        'Priority email support (4h response)',
        'Live chat support',
        'Video call assistance',
        'Custom integrations help',
        'Performance optimization',
      ],
      popular: true,
    },
    {
      name: 'Enterprise Support',
      price: 'Custom',
      description: 'Dedicated support for enterprise clients',
      features: [
        'Dedicated account manager',
        'Phone support (immediate)',
        'Custom SLA agreements',
        'On-site assistance available',
        'Priority feature requests',
        'Technical training sessions',
      ],
    },
  ]

  const faqCategories = [
    {
      icon: Zap,
      title: 'Getting Started',
      description: 'Setup, installation, and initial configuration',
      count: '15+ articles',
    },
    {
      icon: Shield,
      title: 'Security & Privacy',
      description: 'Data protection, compliance, and security features',
      count: '12+ articles',
    },
    {
      icon: Video,
      title: 'Integrations',
      description: 'Third-party integrations and API documentation',
      count: '20+ articles',
    },
    {
      icon: FileText,
      title: 'Billing & Pricing',
      description: 'Payment, invoicing, and subscription management',
      count: '8+ articles',
    },
  ]

  const stats = [
    { number: '99.9%', label: 'Uptime SLA', icon: Shield },
    { number: '< 2min', label: 'Avg Response Time', icon: Clock },
    { number: '4.9★', label: 'Support Rating', icon: Star },
    { number: '10K+', label: 'Happy Clients', icon: Users },
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
                  Customer Support
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-7xl font-bold font-['Space_Grotesk'] mb-8 leading-tight"
              >
                <span className="bg-gradient-to-r from-[#9C6BFF] via-white to-[#7C4DFF] bg-clip-text text-transparent">
                  Support
                </span>
                <br />
                <span className="text-white">That Cares</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-xl md:text-2xl text-gray-300 font-['Inter'] leading-relaxed max-w-4xl mx-auto mb-12"
              >
                Get the help you need, when you need it. Our dedicated support team is here to
                ensure your success with 24/7 assistance and expert guidance.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-6 mb-16">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(156, 107, 255, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#9C6BFF] to-[#7C4DFF] px-8 py-4 rounded-xl font-['Inter'] font-bold text-lg inline-flex items-center space-x-3 hover:shadow-2xl transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Start Live Chat</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-[#9C6BFF] px-8 py-4 rounded-xl font-['Inter'] font-bold text-lg hover:bg-[#9C6BFF]/10 transition-all"
                >
                  Browse Help Center
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

        {/* Support Channels */}
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
                How Can We Help You?
              </h2>
              <p className="text-xl text-gray-400 font-['Inter'] max-w-3xl mx-auto">
                Choose the support channel that works best for you
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {supportChannels.map((channel, index) => (
                <motion.div
                  key={channel.title}
                  variants={fadeInUp}
                  className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-[#9C6BFF]/50 transition-all duration-300 group text-center"
                >
                  <channel.icon className="w-12 h-12 text-[#9C6BFF] mx-auto mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold font-['Space_Grotesk'] mb-3 text-white">
                    {channel.title}
                  </h3>
                  <p className="text-gray-400 font-['Inter'] text-sm leading-relaxed mb-4">
                    {channel.description}
                  </p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Availability:</span>
                      <span className="text-[#9C6BFF]">{channel.availability}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Response:</span>
                      <span className="text-[#9C6BFF]">{channel.responseTime}</span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-[#9C6BFF] to-[#7C4DFF] py-3 rounded-lg font-['Inter'] font-medium text-sm hover:shadow-lg transition-all"
                  >
                    {channel.action}
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Support Plans */}
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
                Support Plans
              </h2>
              <p className="text-xl text-gray-400 font-['Inter'] max-w-3xl mx-auto">
                Choose the level of support that matches your needs
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {supportPlans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  variants={fadeInUp}
                  className={`bg-black/40 backdrop-blur-xl border rounded-2xl p-8 transition-all duration-300 relative ${
                    plan.popular
                      ? 'border-[#9C6BFF] shadow-lg shadow-[#9C6BFF]/20'
                      : 'border-white/10 hover:border-[#9C6BFF]/50'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-[#9C6BFF] to-[#7C4DFF] px-4 py-1 rounded-full text-sm font-['Inter'] font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold font-['Space_Grotesk'] mb-2 text-white">
                      {plan.name}
                    </h3>
                    <div className="text-4xl font-bold font-['Space_Grotesk'] mb-2">
                      <span className="bg-gradient-to-r from-[#9C6BFF] to-[#7C4DFF] bg-clip-text text-transparent">
                        {plan.price}
                      </span>
                    </div>
                    <p className="text-gray-400 font-['Inter'] text-sm">{plan.description}</p>
                  </div>
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-[#9C6BFF] flex-shrink-0" />
                        <span className="text-gray-300 font-['Inter'] text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-4 rounded-xl font-['Inter'] font-bold transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-[#9C6BFF] to-[#7C4DFF] text-white hover:shadow-lg'
                        : 'border-2 border-[#9C6BFF] text-[#9C6BFF] hover:bg-[#9C6BFF]/10'
                    }`}
                  >
                    Get Started
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FAQ Categories */}
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
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-400 font-['Inter'] max-w-3xl mx-auto">
                Find quick answers to common questions
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {faqCategories.map((category, index) => (
                <motion.div
                  key={category.title}
                  variants={fadeInUp}
                  className="text-center group cursor-pointer"
                >
                  <div className="bg-gradient-to-br from-[#9C6BFF] to-[#7C4DFF] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold font-['Space_Grotesk'] mb-2 text-white group-hover:text-[#9C6BFF] transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-gray-400 font-['Inter'] text-sm mb-2">
                    {category.description}
                  </p>
                  <span className="text-xs text-[#9C6BFF] font-['Inter'] font-medium">
                    {category.count}
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
                Still Need Help?
              </h2>
              <p className="text-xl text-gray-400 font-['Inter'] mb-10 leading-relaxed">
                Our support team is always ready to assist you. Get in touch and we'll help you
                succeed.
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
