'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft, 
  Share2, 
  BookOpen, 
  Tag,
  ChevronRight,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  MessageSquare,
  Mail,
  Copy,
  MoreHorizontal
} from 'lucide-react';
import { mockBlogService, MockPost } from '@/lib/mocks/blogMockData';
import { SiWhatsapp, SiTelegram, SiReddit } from 'react-icons/si';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface BlogPostProps {
  params: {
    slug: string;
  };
}

// use a relaxed param type to avoid mismatch with Next PageProps in generated types
const BlogPost = ({ params }: any) => {
  const [post, setPost] = useState<MockPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<MockPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    // UI-ONLY: Simulate loading with mock data
    const loadData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const foundPost = mockBlogService.getPostBySlug(params.slug);
      if (!foundPost) {
        notFound();
        return;
      }
      
      const related = mockBlogService.getRelatedPosts(foundPost.id, 3);
      
      setPost(foundPost);
      setRelatedPosts(related);
      setIsLoading(false);
    };
    
    loadData();
  }, [params.slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const sharePost = (platform: string) => {
    const url = window.location.href;
    const title = post?.title || '';
    const text = `${title} - ${post?.excerpt || ''}`;
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      reddit: `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`I thought you might find this article interesting:\n\n${title}\n${post?.excerpt || ''}\n\nRead more: ${url}`)}`,
      copy: url
    };
    
    if (platform === 'copy') {
      navigator.clipboard.writeText(url).then(() => {
        // Show a brief success message (you could add a toast notification here)
        alert('Link copied to clipboard!');
      });
    } else if (shareUrls[platform as keyof typeof shareUrls]) {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400');
    }
    
    setShowShareMenu(false);
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#0b0b0b] text-white">
        <Navbar />
        <div className="pt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="animate-pulse max-w-4xl mx-auto">
              <div className="h-6 bg-[#181818] rounded mb-6 w-32"></div>
              <div className="h-12 bg-[#181818] rounded mb-4"></div>
              <div className="h-6 bg-[#181818] rounded mb-8 w-64"></div>
              <div className="h-64 bg-[#181818] rounded mb-8"></div>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="h-4 bg-[#181818] rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!post) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">
      <Navbar />
      
      {/* Add top padding to account for fixed navbar */}
      <div className="pt-20">
        {/* Breadcrumb & Back Navigation */}
        <div className="border-b border-gray-800">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <nav className="flex items-center space-x-2 text-sm text-gray-400">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-[#9333ea]">{post.categories[0]}</span>
              </nav>
              
              <Link 
                href="/blog" 
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </div>
          </div>
        </div>

        {/* Article Header */}
        <header className="py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            {/* Category Badge */}
            <div className="flex items-center mb-6">
              <span className="bg-[#9333ea] text-white px-3 py-1 rounded-full text-sm font-medium mr-4">
                {post.categories[0]}
              </span>
              <div className="flex items-center text-gray-400 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                {post.readingTime} min read
              </div>
            </div>
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            
            {/* Excerpt */}
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {post.excerpt}
            </p>
            
            {/* Author & Meta Info */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#9333ea] rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">{post.author.name}</p>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(post.publishedAt)}
                  </div>
                </div>
              </div>
              
              {/* Share Button */}
              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center bg-[#181818] hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </button>
                
                {showShareMenu && (
                  <div className="absolute top-full right-0 mt-2 bg-[#181818] border border-gray-700 rounded-lg shadow-lg z-10 min-w-48">
                    <div className="py-2">
                      <button
                        onClick={() => sharePost('twitter')}
                        className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors text-blue-400"
                      >
                        <Twitter className="w-4 h-4 mr-3" />
                        Twitter
                      </button>
                      <button
                        onClick={() => sharePost('facebook')}
                        className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors text-blue-600"
                      >
                        <Facebook className="w-4 h-4 mr-3" />
                        Facebook
                      </button>
                      <button
                        onClick={() => sharePost('linkedin')}
                        className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors text-blue-500"
                      >
                        <Linkedin className="w-4 h-4 mr-3" />
                        LinkedIn
                      </button>
                      <button
                        onClick={() => sharePost('whatsapp')}
                        className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors text-green-500"
                      >
                        <SiWhatsapp className="w-4 h-4 mr-3" />
                        WhatsApp
                      </button>
                      <button
                        onClick={() => sharePost('telegram')}
                        className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors text-blue-400"
                      >
                        <SiTelegram className="w-4 h-4 mr-3" />
                        Telegram
                      </button>
                      <button
                        onClick={() => sharePost('reddit')}
                        className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors text-orange-500"
                      >
                        <SiReddit className="w-4 h-4 mr-3" />
                        Reddit
                      </button>
                      <button
                        onClick={() => sharePost('email')}
                        className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors text-gray-300"
                      >
                        <Mail className="w-4 h-4 mr-3" />
                        Email
                      </button>
                      <div className="border-t border-gray-600 my-1"></div>
                      <button
                        onClick={() => sharePost('copy')}
                        className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors text-gray-300"
                      >
                        <Copy className="w-4 h-4 mr-3" />
                        Copy Link
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="px-4 mb-12">
          <div className="container mx-auto max-w-4xl">
            <div className="h-64 md:h-96 bg-gradient-to-br from-[#9333ea] to-purple-700 rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-4 right-4 text-white/80 text-sm">
                Featured Image
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <article className="px-4 mb-16">
          <div className="container mx-auto max-w-4xl">
            <div className="prose prose-lg prose-invert max-w-none">
              <div 
                className="text-gray-200 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
                style={{
                  fontSize: '18px',
                  lineHeight: '1.8'
                }}
              />
            </div>
          </div>
        </article>

        {/* Tags */}
        <section className="px-4 mb-16">
          <div className="container mx-auto max-w-4xl">
            <div className="border-t border-gray-800 pt-8">
              <div className="flex items-center mb-4">
                <Tag className="w-5 h-5 mr-2 text-[#9333ea]" />
                <span className="font-semibold">Tags</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                    className="bg-[#181818] hover:bg-gray-700 text-gray-300 hover:text-white px-3 py-1 rounded-full text-sm transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Author Bio */}
        <section className="px-4 mb-16">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-[#181818] rounded-xl p-8 border border-gray-800">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-[#9333ea] rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">About {post.author.name}</h3>
                  <p className="text-gray-300 mb-4">
                    {post.author.bio || `${post.author.name} is a contributor to our blog, sharing insights and expertise in their field.`}
                  </p>
                  <div className="flex space-x-4">
                    <button className="text-[#9333ea] hover:text-purple-400 transition-colors">
                      Follow
                    </button>
                    <button className="text-gray-400 hover:text-white transition-colors">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comments Section (UI-ONLY Mock) */}
        <section className="px-4 mb-16">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-[#181818] rounded-xl p-8 border border-gray-800">
              <div className="flex items-center mb-6">
                <MessageCircle className="w-6 h-6 mr-3 text-[#9333ea]" />
                <h3 className="text-xl font-bold">Comments</h3>
                <span className="ml-3 bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-sm">0</span>
              </div>
              
              <div className="text-center py-12 text-gray-400">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">No comments yet</p>
                <p className="text-sm">Be the first to share your thoughts!</p>
              </div>
              
              <div className="border-t border-gray-700 pt-6">
                <textarea
                  placeholder="Write a comment..."
                  className="w-full bg-[#0b0b0b] border border-gray-700 rounded-lg p-4 text-white placeholder-gray-400 resize-none h-24 focus:outline-none focus:border-[#9333ea] transition-colors"
                />
                <div className="flex justify-end mt-4">
                  <button className="bg-[#9333ea] hover:bg-purple-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="px-4 mb-16">
            <div className="container mx-auto max-w-4xl">
              <div className="flex items-center mb-8">
                <BookOpen className="w-6 h-6 mr-3 text-[#9333ea]" />
                <h2 className="text-2xl font-bold">Related Articles</h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <article key={relatedPost.id} className="group">
                    <Link href={`/blog/${relatedPost.slug}`}>
                      <div className="bg-[#181818] rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300">
                        <div className="h-32 bg-gradient-to-br from-gray-700 to-gray-800 relative">
                          <div className="absolute top-3 left-3">
                            <span className="bg-[#9333ea] text-white px-2 py-1 rounded-full text-xs">
                              {relatedPost.categories[0]}
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold mb-2 text-white group-hover:text-[#9333ea] transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h3>
                          <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                            {relatedPost.excerpt}
                          </p>
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="w-3 h-3 mr-1" />
                            {relatedPost.readingTime}m read
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
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

export default BlogPost;
