import { prisma } from '@/lib/prisma';
import { PostCard } from '@/components/PostCard';
import { VideoCard } from '@/components/VideoCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function Home() {
  const [posts, videos] = await Promise.all([
    prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 3,
    }),
    prisma.video.findMany({
      orderBy: { publishedAt: 'desc' },
      take: 3,
    }),
  ]);

  return (
    <div>
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center space-y-6">
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight">
            مرحباً، أنا <span className="text-primary">أحمد شهدي</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            مطور ويب متخصص في بناء تطبيقات ويب حديثة وعصرية. أشاركك تجاربي ومقالاتي عبر هذه المنصة.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/blog">
              <Button size="lg">اقرأ المقالات</Button>
            </Link>
            <Link href="/videos">
              <Button size="lg" variant="outline">شاهد الفيديوهات</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      {posts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="space-y-12">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold">آخر المقالات</h2>
                <p className="text-muted-foreground mt-2">أحدث المحتوى من المدونة</p>
              </div>
              <Link href="/blog">
                <Button variant="outline">
                  عرض الكل
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
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
          </div>
        </section>
      )}

      {/* Latest Videos Section */}
      {videos.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="space-y-12">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold">آخر الفيديوهات</h2>
                <p className="text-muted-foreground mt-2">شاهد أحدث فيديوهاتي على اليوتيوب</p>
              </div>
              <Link href="/videos">
                <Button variant="outline">
                  عرض الكل
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </Button>
              </Link>
            </div>

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
          </div>
        </section>
      )}
    </div>
  );
}
