'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

const BlogSearchClient = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to search results page
      router.push(`/blog/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-[#1A1A1A] border border-[#333] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9C6BFF] text-white"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#666] w-5 h-5" />
      </div>
    </form>
  )
}

export default BlogSearchClient
