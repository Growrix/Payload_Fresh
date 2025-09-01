'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Calendar, Clock, User, ArrowRight, TrendingUp, BookOpen } from 'lucide-react';
import { mockBlogService, MockPost } from '@/lib/mocks/blogMockData';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const BlogHomepage = () => {
  const [featuredPosts, setFeaturedPosts] = useState<MockPost[]>([]);
  const [recentPosts, setRecentPosts] = useState<MockPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // UI-ONLY: Simulate loading with mock data
    const loadData = async () => {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const featured = mockBlogService.getFeaturedPosts();
      const recent = mockBlogService.getPosts({ limit: 6 });
      
      setFeaturedPosts(featured);
      setRecentPosts(recent);
      setIsLoading(false);
    };
    
    loadData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // UI-ONLY: In real implementation, this would navigate to search results
      window.location.href = `/blog/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#0b0b0b] text-white">
        <Navbar />
        <div className="pt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="animate-pulse">
              <div className="h-8 bg-[#181818] rounded mb-8 w-64"></div>
              <div className="grid lg:grid-cols-3 gap-8 mb-12">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-[#181818] rounded-lg h-64"></div>
                ))}
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="bg-[#181818] rounded-lg h-48"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">
      <Navbar />
      
      {/* Add top padding to account for fixed navbar */}
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center bg-[#9333ea]/10 text-[#9333ea] px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4 mr-2" />
              Latest Insights & Tutorials
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Welcome to Our Blog
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover the latest in web development, design trends, and technology insights. 
              Learn from industry experts and level up your skills.
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-md mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#181818] border border-gray-700 rounded-full py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#9333ea] transition-colors"
                />
              </div>
            </form>
          </div>
        </section>

        {/* Featured Posts */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-2">Featured Articles</h2>
                <p className="text-gray-400">Handpicked stories worth your time</p>
              </div>
              <div className="flex items-center text-[#9333ea] font-medium">
                <TrendingUp className="w-5 h-5 mr-2" />
                Trending Now
              </div>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <article key={post.id} className={`group cursor-pointer ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
                  <Link href={`/blog/${post.slug}`}>
                    <div className="bg-[#181818] rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300 h-full">
                      {/* Featured Image Placeholder */}
                      <div className={`bg-gradient-to-br from-[#9333ea] to-purple-700 ${index === 0 ? 'h-64 lg:h-80' : 'h-48'} relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center space-x-4 text-white/80 text-sm mb-2">
                            <span className="bg-white/20 px-2 py-1 rounded-full">{post.categories[0]}</span>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {post.readingTime} min read
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className={`p-6 ${index === 0 ? 'lg:p-8' : ''}`}>
                        <h3 className={`font-bold mb-3 text-white group-hover:text-[#9333ea] transition-colors ${index === 0 ? 'text-2xl lg:text-3xl' : 'text-xl'}`}>
                          {post.title}
                        </h3>
                        <p className={`text-gray-400 mb-4 ${index === 0 ? 'text-lg' : ''}`}>
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-[#9333ea] rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <p className="text-white font-medium">{post.author.name}</p>
                              <p className="text-gray-400 text-sm">{formatDate(post.publishedAt)}</p>
                            </div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-[#9333ea] group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Posts Grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-2">Latest Articles</h2>
                <p className="text-gray-400">Fresh content from our writers</p>
              </div>
              <Link href="/blog/all" className="flex items-center text-[#9333ea] font-medium hover:text-purple-400 transition-colors">
                View All Articles
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <article key={post.id} className="group cursor-pointer">
                  <Link href={`/blog/${post.slug}`}>
                    <div className="bg-[#181818] rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:transform hover:scale-105">
                      {/* Post Image Placeholder */}
                      <div className="h-48 bg-gradient-to-br from-gray-700 to-gray-800 relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="absolute top-4 left-4">
                          <span className="bg-[#9333ea] text-white px-3 py-1 rounded-full text-sm font-medium">
                            {post.categories[0]}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#9333ea] transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-400 mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-3 text-gray-400">
                            <div className="flex items-center">
                              <User className="w-4 h-4 mr-1" />
                              {post.author.name}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {formatDate(post.publishedAt)}
                            </div>
                          </div>
                          <div className="flex items-center text-[#9333ea]">
                            <Clock className="w-4 h-4 mr-1" />
                            {post.readingTime}m
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-gradient-to-r from-[#9333ea] to-purple-700 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Stay Updated
              </h2>
              <p className="text-purple-100 mb-8 text-lg max-w-2xl mx-auto">
                Get the latest articles, tutorials, and insights delivered straight to your inbox. 
                Join thousands of developers in our community.
              </p>
              
              <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-white placeholder-purple-200 focus:outline-none focus:border-white/40 transition-colors"
                />
                <button
                  type="submit"
                  className="bg-white text-[#9333ea] font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
              
              <p className="text-purple-200 text-sm mt-4">
                No spam. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </main>
  );
};

export default BlogHomepage;
