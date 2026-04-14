'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PostSchema } from '@/lib/schemas';
import { generateSlug } from '@/lib/utils';

export default function NewPostPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    image: '',
    published: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = PostSchema.safeParse(formData);
      if (!result.success) {
        setError('بيانات غير صحيحة');
        return;
      }

      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) {
        setError('فشل في إنشاء المقالة');
        return;
      }

      router.push('/admin/posts');
    } catch (err) {
      setError('حدث خطأ غير متوقع');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Card>
        <CardHeader>
          <CardTitle>مقالة جديدة</CardTitle>
          <CardDescription>أنشئ مقالة جديدة على المدونة</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">العنوان</label>
                <Input
                  placeholder="عنوان المقالة"
                  value={formData.title}
                  onChange={handleTitleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">الرابط (Slug)</label>
                <Input
                  placeholder="post-slug"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, slug: e.target.value }))
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">صورة الغلاف (URL)</label>
              <Input
                placeholder="https://example.com/image.jpg"
                value={formData.image}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, image: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">المحتوى</label>
              <Textarea
                placeholder="محتوى المقالة..."
                value={formData.content}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, content: e.target.value }))
                }
                className="min-h-64"
                required
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, published: e.target.checked }))
                }
                className="w-4 h-4"
              />
              <label htmlFor="published" className="text-sm font-medium">
                نشر المقالة الآن
              </label>
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive rounded-md">
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'جاري الحفظ...' : 'حفظ المقالة'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                إلغاء
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
