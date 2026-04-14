import type { Metadata } from 'next';
import { ThemeWrapper } from '@/components/ThemeWrapper';
import { Navbar } from '@/components/Navbar';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Ahmad Shehadi - Portfolio & Blog',
  description: 'Personal portfolio and blog of Ahmad Shehadi featuring articles, videos, and projects.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body>
        <ThemeWrapper>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <footer className="border-t border-border bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="text-center text-sm text-muted-foreground">
                <p>© 2026 Ahmad Shehadi. جميع الحقوق محفوظة.</p>
              </div>
            </div>
          </footer>
        </ThemeWrapper>
      </body>
    </html>
  );
}
