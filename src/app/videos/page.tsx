'use client';

import { useState, useEffect } from 'react';
import { VideoCard } from '@/components/VideoCard';

interface Video {
  id: string;
  title: string;
  youtubeId: string;
  description: string | null;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/videos');
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">الفيديوهات</h1>
          <p className="text-xl text-muted-foreground">
            شاهد أحدث فيديوهاتي على اليوتيوب حول تطوير الويب والبرمجة
          </p>
        </div>

        {/* Videos Grid */}
        {isLoading ? (
          <div className="text-center text-muted-foreground">
            جاري تحميل الفيديوهات...
          </div>
        ) : videos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <VideoCard
                key={video.id}
                id={video.id}
                title={video.title}
                youtubeId={video.youtubeId}
                description={video.description || undefined}
                publishedAt={video.publishedAt}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            لا توجد فيديوهات حالياً
          </div>
        )}
      </div>
    </div>
  );
}
