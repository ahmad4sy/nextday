'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Video, FileJson, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function AdminDashboard() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>جاري التحميل...</p>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    redirect('/admin/login');
  }

  const dashboardItems = [
    {
      title: 'إدارة المقالات',
      description: 'إضافة وتعديل وحذف المقالات',
      icon: FileText,
      href: '/admin/posts',
      color: 'bg-blue-500',
    },
    {
      title: 'إدارة الفيديوهات',
      description: 'إدارة فيديوهات اليوتيوب',
      icon: Video,
      href: '/admin/videos',
      color: 'bg-red-500',
    },
    {
      title: 'إدارة الصفحات',
      description: 'إنشاء وتعديل الصفحات الإضافية',
      icon: FileJson,
      href: '/admin/pages',
      color: 'bg-green-500',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">لوحة التحكم</h1>
            <p className="text-muted-foreground mt-2">
              مرحباً، {session?.user?.email}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
          >
            <LogOut className="w-4 h-4 mr-2" />
            تسجيل الخروج
          </Button>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dashboardItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          {item.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-2">
                          {item.description}
                        </p>
                      </div>
                      <div className={`${item.color} p-3 rounded-lg text-white`}>
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
