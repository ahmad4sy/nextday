'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, PlayCircle } from 'lucide-react';

interface VideoCardProps {
  id: string;
  title: string;
  youtubeId: string;
  description?: string;
  publishedAt: Date;
}

export function VideoCard({
  id,
  title,
  youtubeId,
  description,
  publishedAt,
}: VideoCardProps) {
  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
  const videoUrl = `https://www.youtube.com/watch?v=${youtubeId}`;
  const formattedDate = new Intl.DateTimeFormat('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(publishedAt));

  return (
    <a href={videoUrl} target="_blank" rel="noopener noreferrer">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
        <div className="relative w-full h-48 bg-muted group">
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
            <PlayCircle className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
        <CardHeader>
          <CardTitle className="line-clamp-2 text-lg">{title}</CardTitle>
          <CardDescription>{formattedDate}</CardDescription>
        </CardHeader>
        {description && (
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          </CardContent>
        )}
      </Card>
    </a>
  );
}
