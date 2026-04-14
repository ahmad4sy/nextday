'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PagesAdminPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">الصفحات الإضافية</h1>
          <p className="text-muted-foreground mt-2">
            إدارة الصفحات الإضافية مثل About وغيرها
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4 py-12">
              <p className="text-muted-foreground">هذه الميزة قيد التطوير</p>
              <Link href="/admin">
                <Button variant="outline">العودة إلى لوحة التحكم</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
