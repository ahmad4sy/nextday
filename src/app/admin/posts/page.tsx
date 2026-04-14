'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  createdAt: Date;
}

export default function PostsAdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts?admin=true');
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه المقالة؟')) return;

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPosts(posts.filter(post => post.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">المقالات</h1>
            <p className="text-muted-foreground mt-2">
              إدارة المقالات والمحتوى
            </p>
          </div>
          <Link href="/admin/posts/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              مقالة جديدة
            </Button>
          </Link>
        </div>

        {/* Posts Table */}
        {isLoading ? (
          <div className="text-center text-muted-foreground">
            جاري التحميل...
          </div>
        ) : posts.length > 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>جميع المقالات ({posts.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center justify-between p-4 border rounded-md hover:bg-accent transition-colors"
                  >
                    <div className="flex-1 space-y-1">
                      <p className="font-medium">{post.title}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>/{post.slug}</span>
                        {post.published ? (
                          <span className="flex items-center gap-1 text-green-600">
                            <Eye className="w-4 h-4" />
                            منشورة
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-yellow-600">
                            <EyeOff className="w-4 h-4" />
                            مسودة
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/posts/${post.id}`}>
                        <Button variant="outline" size="sm">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(post.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4 py-12">
                <p className="text-muted-foreground">لا توجد مقالات حالياً</p>
                <Link href="/admin/posts/new">
                  <Button>إنشاء مقالة جديدة</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
