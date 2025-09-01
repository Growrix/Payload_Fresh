'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    message: '',
  })
  const [success, setSuccess] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Contact form submit:', form)
    setSuccess('Thanks — your message was sent.')
    setTimeout(() => setSuccess(''), 5000)
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-[#0B0B0B] p-8 rounded-2xl border border-[#9C6BFF]/20"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="flex flex-col">
          <span className="text-sm text-[#B0B0B0]">Full Name</span>
          <input
            required
            name="name"
            value={form.name}
            onChange={handleChange}
            className="mt-2 p-3 bg-[#111111] rounded-lg border border-[#222] focus:outline-none focus:ring-2 focus:ring-[#9C6BFF]"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-sm text-[#B0B0B0]">Email</span>
          <input
            required
            name="email"
            value={form.email}
            onChange={handleChange}
            className="mt-2 p-3 bg-[#111111] rounded-lg border border-[#222] focus:outline-none focus:ring-2 focus:ring-[#9C6BFF]"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-sm text-[#B0B0B0]">Company</span>
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            className="mt-2 p-3 bg-[#111111] rounded-lg border border-[#222] focus:outline-none focus:ring-2 focus:ring-[#9C6BFF]"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-sm text-[#B0B0B0]">Project Type</span>
          <select
            name="projectType"
            value={form.projectType}
            onChange={handleChange}
            className="mt-2 p-3 bg-[#111111] rounded-lg border border-[#222] focus:outline-none focus:ring-2 focus:ring-[#9C6BFF]"
          >
            <option value="">Select...</option>
            <option>Website</option>
            <option>Mobile App</option>
            <option>Design</option>
            <option>Other</option>
          </select>
        </label>

        <label className="flex flex-col md:col-span-2">
          <span className="text-sm text-[#B0B0B0]">Budget Range</span>
          <select
            name="budget"
            value={form.budget}
            onChange={handleChange}
            className="mt-2 p-3 bg-[#111111] rounded-lg border border-[#222] focus:outline-none focus:ring-2 focus:ring-[#9C6BFF]"
          >
            <option value="">Select...</option>
            <option>$5k - $15k</option>
            <option>$15k - $50k</option>
            <option>$50k+</option>
          </select>
        </label>

        <label className="flex flex-col md:col-span-2">
          <span className="text-sm text-[#B0B0B0]">Message</span>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={6}
            className="mt-2 p-3 bg-[#111111] rounded-lg border border-[#222] focus:outline-none focus:ring-2 focus:ring-[#9C6BFF]"
          />
        </label>

        <label className="flex flex-col md:col-span-2">
          <span className="text-sm text-[#B0B0B0]">Upload</span>
          <div className="mt-2 p-6 bg-[#0F0F0F] rounded-lg border-2 border-dashed border-[#222] text-center text-sm text-[#B0B0B0]">
            Drag or click to upload (mock)
          </div>
        </label>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button className="bg-[#9C6BFF] text-white px-6 py-3 rounded-lg font-semibold">
          Send Message
        </button>
        {success && <div className="text-green-400">{success}</div>}
      </div>
    </motion.form>
  )
}
