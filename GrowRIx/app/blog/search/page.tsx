'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft, 
  ChevronRight,
  Grid3X3,
  List,
  Filter
} from 'lucide-react';
import { mockBlogService, MockPost } from '@/lib/mocks/blogMockData';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const SearchPageContent = () => {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [searchResults, setSearchResults] = useState<MockPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, [searchParams]);

  const performSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setHasSearched(true);
    
    // UI-ONLY: Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const results = mockBlogService.getPosts({ search: query });
    setSearchResults(results);
    setIsLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Update URL without page reload
      const newUrl = `/blog/search?q=${encodeURIComponent(searchQuery)}`;
      window.history.pushState({}, '', newUrl);
      performSearch(searchQuery);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const highlightSearchTerm = (text: string, term: string) => {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, '<mark class="bg-[#9333ea] text-white">$1</mark>');
  };

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
            <span className="text-[#9333ea]">Search</span>
          </nav>
        </div>
      </div>

      {/* Search Header */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-[#9333ea]/10 text-[#9333ea] px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Search className="w-4 h-4 mr-2" />
              Search Articles
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Find Your Next Read
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Search through our collection of articles, tutorials, and insights
            </p>
          </div>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Search articles, topics, authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#181818] border border-gray-700 rounded-2xl py-4 pl-16 pr-6 text-white placeholder-gray-400 focus:outline-none focus:border-[#9333ea] transition-colors text-lg"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#9333ea] hover:bg-purple-600 text-white px-6 py-2 rounded-xl font-medium transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* Search Results Summary */}
          {hasSearched && (
            <div className="text-center">
              <p className="text-gray-400">
                {isLoading ? (
                  'Searching...'
                ) : (
                  <>
                    Found <span className="text-[#9333ea] font-semibold">{searchResults.length}</span> 
                    {searchResults.length === 1 ? ' result' : ' results'} 
                    for "<span className="text-white font-medium">{searchQuery}</span>"
                  </>
                )}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Search Results */}
      {hasSearched && (
        <>
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
                
                {searchResults.length > 0 && (
                  <div className="flex items-center space-x-4">
                    {/* Filter Button (UI-ONLY) */}
                    <button className="flex items-center bg-[#181818] hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors text-gray-300">
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                    </button>
                    
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
                )}
              </div>
            </div>
          </section>

          {/* Results */}
          <section className="px-4 pb-16">
            <div className="container mx-auto">
              {isLoading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="bg-[#181818] rounded-lg h-64 animate-pulse"></div>
                  ))}
                </div>
              ) : searchResults.length === 0 ? (
                <div className="text-center py-16">
                  <div className="bg-[#181818] rounded-xl p-12 max-w-md mx-auto">
                    <div className="w-16 h-16 bg-[#9333ea]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Search className="w-8 h-8 text-[#9333ea]" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">No Results Found</h3>
                    <p className="text-gray-400 mb-6">
                      We couldn't find any articles matching "<span className="text-white font-medium">{searchQuery}</span>". 
                      Try different keywords or browse our categories.
                    </p>
                    <div className="space-y-3">
                      <Link 
                        href="/blog"
                        className="block bg-[#9333ea] hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                      >
                        Browse All Articles
                      </Link>
                      <p className="text-gray-500 text-sm">
                        Suggestions: Try broader terms, check spelling, or explore our categories
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {viewMode === 'grid' ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {searchResults.map((post) => (
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
                                <h3 
                                  className="text-xl font-bold mb-3 text-white group-hover:text-[#9333ea] transition-colors"
                                  dangerouslySetInnerHTML={{ 
                                    __html: highlightSearchTerm(post.title, searchQuery) 
                                  }}
                                />
                                <p 
                                  className="text-gray-400 mb-4 line-clamp-2"
                                  dangerouslySetInnerHTML={{ 
                                    __html: highlightSearchTerm(post.excerpt, searchQuery) 
                                  }}
                                />
                                
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
                      {searchResults.map((post) => (
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
                                  <h3 
                                    className="text-xl font-bold mb-3 text-white group-hover:text-[#9333ea] transition-colors"
                                    dangerouslySetInnerHTML={{ 
                                      __html: highlightSearchTerm(post.title, searchQuery) 
                                    }}
                                  />
                                  <p 
                                    className="text-gray-400 mb-4 line-clamp-3"
                                    dangerouslySetInnerHTML={{ 
                                      __html: highlightSearchTerm(post.excerpt, searchQuery) 
                                    }}
                                  />
                                  
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
        </>
      )}

      {/* Search Suggestions (when no search has been performed) */}
      {!hasSearched && (
        <section className="px-4 pb-16">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold mb-4">Popular Search Terms</h2>
              <p className="text-gray-400 mb-8">
                Explore trending topics and popular articles
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                { term: 'React', count: 12, color: 'from-blue-500 to-blue-600' },
                { term: 'Next.js', count: 8, color: 'from-gray-600 to-gray-700' },
                { term: 'TypeScript', count: 6, color: 'from-blue-600 to-blue-700' },
                { term: 'Performance', count: 5, color: 'from-green-500 to-green-600' },
                { term: 'Design Systems', count: 4, color: 'from-purple-500 to-purple-600' },
                { term: 'Web Development', count: 15, color: 'from-orange-500 to-orange-600' }
              ].map((item) => (
                <button
                  key={item.term}
                  onClick={() => {
                    setSearchQuery(item.term);
                    performSearch(item.term);
                  }}
                  className={`bg-gradient-to-r ${item.color} rounded-xl p-6 text-white hover:transform hover:scale-105 transition-all duration-300`}
                >
                  <h3 className="text-lg font-bold mb-2">{item.term}</h3>
                  <p className="text-white/80">{item.count} articles</p>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
      
      </div>
      
      <Footer />
    </main>
  );
};

// Wrapper component with Suspense
const SearchPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading search...</p>
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
};

export default SearchPage;
