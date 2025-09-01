"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  ArrowUpRight
} from "lucide-react";

const footerLinks = {
  company: [
    { name: "About Us", href: "#about" },
    { name: "Our Story", href: "#story" },
    { name: "Careers", href: "#careers" },
    { name: "Blog", href: "#blog" }
  ],
  services: [
    { name: "Web Development", href: "#web-dev" },
    { name: "Mobile Apps", href: "#mobile" },
    { name: "UI/UX Design", href: "#design" },
    { name: "Consulting", href: "#consulting" }
  ],
  resources: [
    { name: "Case Studies", href: "#cases" },
    { name: "Documentation", href: "#docs" },
    { name: "Support", href: "#support" },
    { name: "Contact", href: "#contact" }
  ]
};

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <footer ref={ref} className="bg-[#0B0B0B] py-20 px-6 border-t border-[#9C6BFF]/10">
      <div className="max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <h3 className="text-2xl font-bold mb-6 font-['Space_Grotesk']">
              GrowRix
            </h3>
            <p className="text-[#B0B0B0] mb-6 font-['Inter'] leading-relaxed">
              We engineer digital experiences that transform businesses and delight users. 
              Let's build something remarkable together.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-[#B0B0B0]">
                <Mail className="w-4 h-4 text-[#9C6BFF]" />
                <span className="font-['Inter']">hello@growrix.com</span>
              </div>
              <div className="flex items-center space-x-3 text-[#B0B0B0]">
                <Phone className="w-4 h-4 text-[#9C6BFF]" />
                <span className="font-['Inter']">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-[#B0B0B0]">
                <MapPin className="w-4 h-4 text-[#9C6BFF]" />
                <span className="font-['Inter']">San Francisco, CA</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-xl font-bold mb-6 font-['Space_Grotesk'] text-white">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="text-[#B0B0B0] hover:text-[#9C6BFF] transition-colors duration-300 font-['Inter'] flex items-center group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-xl font-bold mb-6 font-['Space_Grotesk'] text-white">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="text-[#B0B0B0] hover:text-[#9C6BFF] transition-colors duration-300 font-['Inter'] flex items-center group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-xl font-bold mb-6 font-['Space_Grotesk'] text-white">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="text-[#B0B0B0] hover:text-[#9C6BFF] transition-colors duration-300 font-['Inter'] flex items-center group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-[#9C6BFF]/10 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="text-2xl font-bold font-['Space_Grotesk'] text-[#9C6BFF]">
              GR
            </div>
            <p className="text-[#B0B0B0] font-['Inter']">
              © 2024 GrowRix. All rights reserved.
            </p>
          </div>

          <div className="flex items-center space-x-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                whileHover={{ 
                  scale: 1.2,
                  boxShadow: "0 0 20px #9C6BFF40"
                }}
                whileTap={{ scale: 0.9 }}
                className="text-[#B0B0B0] hover:text-[#9C6BFF] transition-colors duration-300"
                aria-label={social.label}
              >
                <social.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
