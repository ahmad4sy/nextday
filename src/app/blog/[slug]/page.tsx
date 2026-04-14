import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
  });

  return {
    title: post?.title || 'Post not found',
    description: post?.content.substring(0, 160) || '',
  };
}

export default async function PostPage({ params }: PageProps) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
  });

  if (!post || !post.published) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl font-bold text-center">المقالة غير موجودة</h1>
      </div>
    );
  }

  const formattedDate = new Intl.DateTimeFormat('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(post.createdAt));

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12 space-y-4">
        <h1 className="text-5xl font-bold">{post.title}</h1>
        <p className="text-lg text-muted-foreground">{formattedDate}</p>
      </header>

      {post.image && (
        <div className="mb-12 rounded-lg overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-96 object-cover"
          />
        </div>
      )}

      <div className="prose dark:prose-invert max-w-none space-y-6">
        {post.content.split('\n').map((paragraph, idx) => (
          <p key={idx} className="text-lg leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
