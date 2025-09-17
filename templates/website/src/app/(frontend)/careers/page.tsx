'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/growrix/Navbar'
import Footer from '@/components/growrix/Footer'
import {
  Users,
  Heart,
  Coffee,
  Wifi,
  Car,
  GraduationCap,
  MapPin,
  Clock,
  DollarSign,
  ArrowRight,
  Building,
  Globe,
  Zap,
  Target,
} from 'lucide-react'

export default function CareersPage() {
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

  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance, dental, vision, and mental health support',
    },
    {
      icon: Coffee,
      title: 'Work-Life Balance',
      description: 'Flexible hours, unlimited PTO, and remote work options',
    },
    {
      icon: GraduationCap,
      title: 'Learning & Development',
      description: '$2,000 annual budget for courses, conferences, and certifications',
    },
    {
      icon: Car,
      title: 'Transportation',
      description: 'Commuter benefits, parking allowance, or bike-to-work incentives',
    },
    {
      icon: Wifi,
      title: 'Tech Setup',
      description: 'Top-tier equipment, home office stipend, and latest software licenses',
    },
    {
      icon: Building,
      title: 'Office Perks',
      description: 'Modern workspace, free snacks, game room, and team events',
    },
  ]

  const jobs = [
    {
      title: 'Senior Full-Stack Developer',
      department: 'Engineering',
      location: 'San Francisco, CA / Remote',
      type: 'Full-time',
      salary: '$120k - $160k',
      description:
        'Lead development of scalable web applications using React, Node.js, and modern cloud technologies.',
      requirements: [
        '5+ years experience',
        'React/Node.js expertise',
        'Cloud platforms (AWS/Azure)',
        'Team leadership skills',
      ],
    },
    {
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'San Francisco, CA / Remote',
      type: 'Full-time',
      salary: '$90k - $130k',
      description:
        'Create beautiful, user-centered designs for web and mobile applications that delight our clients.',
      requirements: [
        '3+ years experience',
        'Figma/Sketch proficiency',
        'User research skills',
        'Portfolio required',
      ],
    },
    {
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      salary: '$110k - $150k',
      description:
        'Build and maintain CI/CD pipelines, infrastructure automation, and monitoring systems.',
      requirements: [
        'Docker/Kubernetes',
        'AWS/GCP experience',
        'Terraform knowledge',
        'Linux administration',
      ],
    },
    {
      title: 'Project Manager',
      department: 'Operations',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$80k - $110k',
      description:
        'Coordinate cross-functional teams to deliver projects on time and exceed client expectations.',
      requirements: [
        'PMP/Scrum certification',
        'Agile methodology',
        'Client management',
        'Strong communication',
      ],
    },
    {
      title: 'Marketing Specialist',
      department: 'Marketing',
      location: 'Remote',
      type: 'Full-time',
      salary: '$70k - $95k',
      description:
        'Drive growth through content marketing, social media, and digital advertising campaigns.',
      requirements: [
        'Digital marketing experience',
        'Content creation',
        'Analytics tools',
        'Creative mindset',
      ],
    },
    {
      title: 'Business Development Intern',
      department: 'Sales',
      location: 'San Francisco, CA',
      type: 'Internship',
      salary: '$25/hour',
      description:
        'Support sales team with lead generation, market research, and client relationship management.',
      requirements: [
        'Business/Marketing student',
        'Strong research skills',
        'Excel proficiency',
        'Eager to learn',
      ],
    },
  ]

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description:
        'We strive for excellence in everything we do, from code quality to client relationships.',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Great things happen when talented people work together toward a common goal.',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We embrace new technologies and creative solutions to solve complex problems.',
    },
    {
      icon: Globe,
      title: 'Impact',
      description:
        "Our work makes a difference in our clients' businesses and their customers' lives.",
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
                  Join Our Team
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-7xl font-bold font-['Space_Grotesk'] mb-8 leading-tight"
              >
                <span className="bg-gradient-to-r from-[#9C6BFF] via-white to-[#7C4DFF] bg-clip-text text-transparent">
                  Build the Future
                </span>
                <br />
                <span className="text-white">With Us</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-xl md:text-2xl text-gray-300 font-['Inter'] leading-relaxed max-w-4xl mx-auto mb-12"
              >
                Join a team of passionate creators, innovators, and problem-solvers who are shaping
                the digital future. We're always looking for talented individuals who share our
                vision.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-6">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(156, 107, 255, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#9C6BFF] to-[#7C4DFF] px-8 py-4 rounded-xl font-['Inter'] font-bold text-lg inline-flex items-center space-x-3 hover:shadow-2xl transition-all"
                >
                  <span>View Open Positions</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-[#9C6BFF] px-8 py-4 rounded-xl font-['Inter'] font-bold text-lg hover:bg-[#9C6BFF]/10 transition-all"
                >
                  Learn About Culture
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Why Join Us */}
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
                Why Choose Growrix?
              </h2>
              <p className="text-xl text-gray-400 font-['Inter'] max-w-3xl mx-auto">
                We believe great work happens when people are empowered, supported, and inspired
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {values.map((value, index) => (
                <motion.div key={value.title} variants={fadeInUp} className="text-center group">
                  <div className="bg-gradient-to-br from-[#9C6BFF]/20 to-[#7C4DFF]/20 rounded-2xl p-8 backdrop-blur-xl border border-white/10 hover:border-[#9C6BFF]/50 transition-all duration-300 group-hover:scale-105">
                    <value.icon className="w-12 h-12 text-[#9C6BFF] mx-auto mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold font-['Space_Grotesk'] mb-3 text-white">
                      {value.title}
                    </h3>
                    <p className="text-gray-400 font-['Inter'] text-sm leading-relaxed">
                      {value.description}
                    </p>
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
                Benefits & Perks
              </h2>
              <p className="text-xl text-gray-400 font-['Inter'] max-w-3xl mx-auto">
                We invest in our team's success, growth, and well-being
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  variants={fadeInUp}
                  className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-[#9C6BFF]/50 transition-all duration-300 group"
                >
                  <benefit.icon className="w-12 h-12 text-[#9C6BFF] mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold font-['Space_Grotesk'] mb-4 text-white">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400 font-['Inter'] leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Open Positions */}
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
                Open Positions
              </h2>
              <p className="text-xl text-gray-400 font-['Inter'] max-w-3xl mx-auto">
                Find your next opportunity and help us build amazing digital experiences
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-6"
            >
              {jobs.map((job, index) => (
                <motion.div
                  key={job.title}
                  variants={fadeInUp}
                  className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-[#9C6BFF]/50 transition-all duration-300 group"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <h3 className="text-2xl font-bold font-['Space_Grotesk'] text-white">
                          {job.title}
                        </h3>
                        <span className="px-3 py-1 bg-gradient-to-r from-[#9C6BFF] to-[#7C4DFF] rounded-full text-sm font-medium">
                          {job.department}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-6 text-gray-400 font-['Inter'] mb-4">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4" />
                          <span>{job.salary}</span>
                        </div>
                      </div>

                      <p className="text-gray-300 font-['Inter'] mb-4 leading-relaxed">
                        {job.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {job.requirements.map((req, reqIndex) => (
                          <span
                            key={reqIndex}
                            className="px-3 py-1 bg-[#9C6BFF]/20 text-[#9C6BFF] rounded-full text-sm font-['Inter']"
                          >
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-center lg:justify-end">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-[#9C6BFF] to-[#7C4DFF] px-6 py-3 rounded-xl font-['Inter'] font-bold inline-flex items-center space-x-2 hover:shadow-lg transition-all"
                      >
                        <span>Apply Now</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Culture Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInLeft}
              >
                <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-8 text-white">
                  Our Culture
                </h2>
                <div className="space-y-6">
                  <p className="text-xl text-gray-300 font-['Inter'] leading-relaxed">
                    At Growrix, we believe that{' '}
                    <span className="text-[#9C6BFF] font-semibold">
                      diverse perspectives drive innovation.
                    </span>{' '}
                    Our team comes from different backgrounds, bringing unique experiences and
                    ideas.
                  </p>
                  <p className="text-lg text-gray-400 font-['Inter'] leading-relaxed">
                    We foster an environment where everyone feels heard, supported, and empowered to
                    do their best work. Whether you're debugging code at 2 AM or brainstorming the
                    next big feature, you'll have a team that has your back.
                  </p>
                  <div className="bg-gradient-to-r from-[#9C6BFF]/10 to-[#7C4DFF]/10 rounded-xl p-6 border border-[#9C6BFF]/20">
                    <p className="text-[#9C6BFF] font-['Inter'] italic">
                      "The best part about working at Growrix is how we challenge each other to grow
                      while supporting each other through the journey."
                    </p>
                    <p className="text-gray-400 font-['Inter'] mt-2 text-sm">
                      - Alex Thompson, Senior Developer
                    </p>
                  </div>
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
                  <div className="grid grid-cols-2 gap-8 text-center">
                    <div>
                      <Users className="w-12 h-12 text-[#9C6BFF] mx-auto mb-4" />
                      <div className="text-3xl font-bold font-['Space_Grotesk'] text-white mb-2">
                        25+
                      </div>
                      <div className="text-gray-400 font-['Inter'] text-sm">Team Members</div>
                    </div>
                    <div>
                      <Globe className="w-12 h-12 text-[#7C4DFF] mx-auto mb-4" />
                      <div className="text-3xl font-bold font-['Space_Grotesk'] text-white mb-2">
                        12
                      </div>
                      <div className="text-gray-400 font-['Inter'] text-sm">Countries</div>
                    </div>
                    <div>
                      <GraduationCap className="w-12 h-12 text-[#9C6BFF] mx-auto mb-4" />
                      <div className="text-3xl font-bold font-['Space_Grotesk'] text-white mb-2">
                        95%
                      </div>
                      <div className="text-gray-400 font-['Inter'] text-sm">
                        Learning Budget Used
                      </div>
                    </div>
                    <div>
                      <Heart className="w-12 h-12 text-[#7C4DFF] mx-auto mb-4" />
                      <div className="text-3xl font-bold font-['Space_Grotesk'] text-white mb-2">
                        4.9
                      </div>
                      <div className="text-gray-400 font-['Inter'] text-sm">Glassdoor Rating</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
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
                Ready to Join Our Journey?
              </h2>
              <p className="text-xl text-gray-400 font-['Inter'] mb-10 leading-relaxed">
                Don't see a position that fits? We're always interested in connecting with talented
                individuals. Send us your resume!
              </p>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(156, 107, 255, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#9C6BFF] to-[#7C4DFF] px-10 py-5 rounded-xl font-['Inter'] font-bold text-lg inline-flex items-center space-x-3 hover:shadow-2xl transition-all"
              >
                <span>Get In Touch</span>
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
