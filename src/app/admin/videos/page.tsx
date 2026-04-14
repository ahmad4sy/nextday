'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useEffect } from 'react';

interface Video {
  id: string;
  title: string;
  youtubeId: string;
  description: string | null;
}

export default function VideosAdminPage() {
  const router = useRouter();
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    youtubeId: '',
    description: '',
  });

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/videos');
        if (response.ok) {
          const data = await response.json();
          setVideos(data);
        }
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newVideo = await response.json();
        setVideos([newVideo, ...videos]);
        setFormData({ title: '', youtubeId: '', description: '' });
        setShowForm(false);
      }
    } catch (error) {
      console.error('Failed to add video:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">الفيديوهات</h1>
            <p className="text-muted-foreground mt-2">
              إدارة فيديوهات اليوتيوب
            </p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="w-4 h-4 mr-2" />
            فيديو جديد
          </Button>
        </div>

        {/* Add Video Form */}
        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>فيديو جديد</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddVideo} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">العنوان</label>
                  <Input
                    placeholder="عنوان الفيديو"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData(prev => ({ ...prev, title: e.target.value }))
                    }
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">معرّف اليوتيوب</label>
                  <Input
                    placeholder="dQw4w9WgXcQ"
                    value={formData.youtubeId}
                    onChange={(e) =>
                      setFormData(prev => ({ ...prev, youtubeId: e.target.value }))
                    }
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">الوصف</label>
                  <Textarea
                    placeholder="وصف الفيديو..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData(prev => ({ ...prev, description: e.target.value }))
                    }
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="submit">حفظ</Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForm(false);
                      setFormData({ title: '', youtubeId: '', description: '' });
                    }}
                  >
                    إلغاء
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Videos List */}
        {isLoading ? (
          <p className="text-center text-muted-foreground">جاري التحميل...</p>
        ) : videos.length > 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    className="flex items-center justify-between p-4 border rounded-md"
                  >
                    <div>
                      <p className="font-medium">{video.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {video.youtubeId}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // TODO: Implement edit functionality
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <p className="text-center text-muted-foreground">لا توجد فيديوهات</p>
        )}
      </div>
    </div>
  );
}
