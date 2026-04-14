'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';

interface PostCardProps {
  id: string;
  title: string;
  slug: string;
  content: string;
  image?: string;
  createdAt: Date;
}

export function PostCard({
  id,
  title,
  slug,
  content,
  image,
  createdAt,
}: PostCardProps) {
  const excerpt = content.substring(0, 150) + '...';
  const formattedDate = new Intl.DateTimeFormat('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(createdAt));

  return (
    <Link href={`/blog/${slug}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
        {image && (
          <div className="relative w-full h-48 bg-muted overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover hover:scale-105 transition-transform"
            />
          </div>
        )}
        <CardHeader>
          <CardTitle className="line-clamp-2">{title}</CardTitle>
          <CardDescription className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {formattedDate}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
            {excerpt}
          </p>
          <div className="flex items-center gap-2 text-primary text-sm font-medium">
            اقرأ المزيد
            <ArrowRight className="w-4 h-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
