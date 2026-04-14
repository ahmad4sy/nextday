'use client';

import { useState, useEffect } from 'react';
import { prisma } from '@/lib/prisma';
import { PostCard } from '@/components/PostCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  image: string | null;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();
        setPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const filtered = posts.filter(
      (post) =>
        post.title.includes(searchQuery) ||
        post.content.includes(searchQuery)
    );
    setFilteredPosts(filtered);
  }, [searchQuery, posts]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">المدونة</h1>
          <p className="text-xl text-muted-foreground">
            اكتشف مقالاتي حول تطوير الويب والبرمجة
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto w-full">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="ابحث عن مقالة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4 pr-10"
            />
          </div>
        </div>

        {/* Posts Grid */}
        {isLoading ? (
          <div className="text-center text-muted-foreground">
            جاري تحميل المقالات...
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                title={post.title}
                slug={post.slug}
                content={post.content}
                image={post.image || undefined}
                createdAt={post.createdAt}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            {searchQuery ? 'لا توجد مقالات تطابق بحثك' : 'لا توجد مقالات حالياً'}
          </div>
        )}
      </div>
    </div>
  );
}
