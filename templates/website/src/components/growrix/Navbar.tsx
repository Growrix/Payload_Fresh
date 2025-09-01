'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showHeader, setShowHeader] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setIsScrolled(currentY > 50)
      setShowHeader(currentY < lastScrollY.current || currentY < 100)
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 transform ${
        isScrolled ? 'bg-[#0B0B0B]/90 backdrop-blur-lg' : 'bg-transparent'
      } ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold font-['Space_Grotesk']"
        >
          GrowRix
        </motion.div>

        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="text-[#B0B0B0] hover:text-white transition-colors font-['Inter']"
          >
            Home
          </Link>
          <Link
            href="/demo-wall"
            className="text-[#B0B0B0] hover:text-white transition-colors font-['Inter']"
          >
            Demo Wall
          </Link>
          <Link
            href="/blog"
            className="text-[#B0B0B0] hover:text-white transition-colors font-['Inter']"
          >
            Blog
          </Link>
          <a
            href="#shop"
            className="text-[#B0B0B0] hover:text-white transition-colors font-['Inter']"
          >
            Shop
          </a>
          <Link
            href="/contact"
            className="text-[#B0B0B0] hover:text-white transition-colors font-['Inter']"
          >
            Contact
          </Link>

          <div className="flex items-center space-x-3">
            <Link href="/signin">
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px #9C6BFF40' }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#9C6BFF] text-white px-6 py-2 rounded-lg font-['Inter'] font-medium inline-block"
              >
                Signin
              </motion.a>
            </Link>
            <Link href="/signup">
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px #9C6BFF40' }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent text-[#9C6BFF] border border-[#9C6BFF] hover:bg-[#9C6BFF] hover:text-white px-6 py-2 rounded-lg font-['Inter'] font-medium inline-block"
              >
                Signup
              </motion.a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
