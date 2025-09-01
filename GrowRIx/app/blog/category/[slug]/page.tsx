'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft, 
  ChevronRight,
  Grid3X3,
  List
} from 'lucide-react';
import { mockBlogService, MockPost, MockCategory } from '@/lib/mocks/blogMockData';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const CategoryPage = ({ params }: CategoryPageProps) => {
  const [category, setCategory] = useState<MockCategory | null>(null);
  const [posts, setPosts] = useState<MockPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    // UI-ONLY: Simulate loading with mock data
    const loadData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const { slug } = await params;
      const foundCategory = mockBlogService.getCategoryBySlug(slug);
      if (!foundCategory) {
        notFound();
        return;
      }
      
      const categoryPosts = mockBlogService.getPosts({ category: foundCategory.name });
      
      setCategory(foundCategory);
      setPosts(categoryPosts);
      setIsLoading(false);
    };
    
    loadData();
  }, [params]);

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
              <div className="h-8 bg-[#181818] rounded mb-4 w-64"></div>
              <div className="h-4 bg-[#181818] rounded mb-8 w-96"></div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="bg-[#181818] rounded-lg h-64"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!category) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">
      <Navbar />
      
      {/* Add top padding to account for fixed navbar */}
      <div className="pt-20">
        {/* Breadcrumb Navigation */}
        <div className="border-b border-gray-800">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center space-x-2 text-sm text-gray-400">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-[#9333ea]">Category</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{category.name}</span>
            </nav>
          </div>
        </div>

      {/* Category Header */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center bg-[#9333ea]/10 text-[#9333ea] px-4 py-2 rounded-full text-sm font-medium mb-6">
            Category
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {category.name}
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {category.description}
          </p>
          <div className="flex items-center justify-center space-x-6 text-gray-400">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              {category.postCount} {category.postCount === 1 ? 'Article' : 'Articles'}
            </div>
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="px-4 mb-8">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/blog" 
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">View:</span>
              <div className="flex bg-[#181818] rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[#9333ea] text-white' : 'text-gray-400 hover:text-white'} transition-colors`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-[#9333ea] text-white' : 'text-gray-400 hover:text-white'} transition-colors`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid/List */}
      <section className="px-4 pb-16">
        <div className="container mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-[#181818] rounded-xl p-12 max-w-md mx-auto">
                <div className="w-16 h-16 bg-[#9333ea]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-8 h-8 text-[#9333ea]" />
                </div>
                <h3 className="text-xl font-bold mb-2">No Articles Yet</h3>
                <p className="text-gray-400 mb-6">
                  There are no articles in the {category.name} category at the moment.
                </p>
                <Link 
                  href="/blog"
                  className="inline-flex items-center bg-[#9333ea] hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Explore All Articles
                </Link>
              </div>
            </div>
          ) : (
            <>
              {viewMode === 'grid' ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post) => (
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
              ) : (
                <div className="space-y-6">
                  {posts.map((post) => (
                    <article key={post.id} className="group cursor-pointer">
                      <Link href={`/blog/${post.slug}`}>
                        <div className="bg-[#181818] rounded-xl border border-gray-800 hover:border-gray-700 transition-all duration-300 overflow-hidden">
                          <div className="md:flex">
                            {/* Post Image */}
                            <div className="md:w-64 h-48 md:h-auto bg-gradient-to-br from-gray-700 to-gray-800 relative overflow-hidden">
                              <div className="absolute inset-0 bg-black/10"></div>
                              <div className="absolute top-4 left-4">
                                <span className="bg-[#9333ea] text-white px-3 py-1 rounded-full text-sm font-medium">
                                  {post.categories[0]}
                                </span>
                              </div>
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1 p-6">
                              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#9333ea] transition-colors">
                                {post.title}
                              </h3>
                              <p className="text-gray-400 mb-4 line-clamp-3">
                                {post.excerpt}
                              </p>
                              
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center space-x-4 text-gray-400">
                                  <div className="flex items-center">
                                    <User className="w-4 h-4 mr-1" />
                                    {post.author.name}
                                  </div>
                                  <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    {formatDate(post.publishedAt)}
                                  </div>
                                  <div className="flex items-center text-[#9333ea]">
                                    <Clock className="w-4 h-4 mr-1" />
                                    {post.readingTime}m read
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Related Categories */}
      <section className="px-4 pb-16">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-8">Explore Other Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockBlogService.getCategories()
              .filter(cat => cat.slug !== category.slug)
              .slice(0, 6)
              .map((cat) => (
                <Link key={cat.id} href={`/blog/category/${cat.slug}`}>
                  <div className="bg-[#181818] rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:transform hover:scale-105">
                    <h3 className="text-lg font-bold mb-2 text-white hover:text-[#9333ea] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {cat.description}
                    </p>
                    <div className="flex items-center text-sm text-[#9333ea]">
                      <Calendar className="w-4 h-4 mr-1" />
                      {cat.postCount} {cat.postCount === 1 ? 'article' : 'articles'}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
      
      </div>
      
      <Footer />
    </main>
  );
};

export default CategoryPage;
