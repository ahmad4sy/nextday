# Ahmad Shehadi - Personal Portfolio & Blog

موقع ويب احترافي يجمع بين مدونة شخصية وعرض المشاريع والفيديوهات من اليوتيوب.

## المميزات

- ✨ تصميم عصري وحديث (Modern & Minimalist)
- 🌓 دعم الوضعين الليلي والنهاري (Dark/Light Mode)
- 📝 مدونة كاملة مع نظام البحث والفلترة
- 🎥 عرض فيديوهات اليوتيوب
- 🔐 لوحة تحكم إدارية آمنة
- 📱 تصميم متجاوب (Responsive Design)
- 🚀 أداء عالي جداً

## المتطلبات

- Node.js 18+
- npm أو yarn أو pnpm
- PostgreSQL 12+

## البدء السريع

### 1. التثبيت

```bash
npm install
```

### 2. إعداد قاعدة البيانات

```bash
# انسخ ملف البيئة
cp .env.example .env.local

# أضف بيانات الاتصال بـ PostgreSQL في .env.local
# DATABASE_URL="postgresql://user:password@localhost:5432/ahmad_shehadi"

# أنشئ جداول قاعدة البيانات
npx prisma migrate dev --name init

# ملء البيانات الأولية (ستcrear admin user)
npx prisma db seed
```

### 3. توليد مفاتيح المصادقة

```bash
# توليد NEXTAUTH_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# انسخ النتيجة في .env.local
NEXTAUTH_SECRET="your-generated-secret"
```

### 4. تشغيل المشروع

```bash
npm run dev
```

هذا سيفتح الموقع على `http://localhost:3000`

## بيانات الدخول الافتراضية

سيتم إنشاء حساب إدارة افتراضي عند تشغيل seed:

- **البريد الإلكتروني**: admin@ahmadshehadi.com
- **كلمة المرور**: يجب تعيينها في `ADMIN_PASSWORD` بملف `.env.local`

## البنية المعمارية

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── admin/             # لوحة التحكم
│   ├── blog/              # صفحات المدونة
│   ├── videos/            # صفحات الفيديوهات
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # الصفحة الرئيسية
├── components/            # مكونات React
│   ├── ui/               # مكونات الواجهة (shadcn/ui)
│   ├── Navbar.tsx
│   ├── PostCard.tsx
│   ├── VideoCard.tsx
│   └── ThemeWrapper.tsx
├── lib/                   # الدوال المساعدة والثوابت
│   ├── prisma.ts         # Prisma client
│   ├── schemas.ts        # Zod validation schemas
│   ├── constants.ts      # الثوابت
│   └── utils.ts          # دوال مساعدة
├── styles/               # CSS global
│   └── globals.css
└── middleware.ts         # NextAuth middleware

prisma/
├── schema.prisma         # قاعدة البيانات schema
└── seed.ts              # بيانات أولية

public/                   # ملفات ثابتة
```

## قاعدة البيانات

### جداول البيانات

#### Users
```sql
- id (Primary Key)
- email (Unique)
- password (Hashed)
- createdAt
- updatedAt
```

#### Posts
```sql
- id (Primary Key)
- title
- slug (Unique)
- content (Text)
- image
- published
- createdAt
- updatedAt
```

#### Videos
```sql
- id (Primary Key)
- title
- youtubeId
- description
- publishedAt
- createdAt
- updatedAt
```

#### Pages
```sql
- id (Primary Key)
- title
- slug (Unique)
- content
- createdAt
- updatedAt
```

## المميزات الأمنية

- ✅ تشفير كلمات المرور باستخدام bcryptjs
- ✅ حماية API Routes باستخدام NextAuth
- ✅ التحقق من صحة البيانات باستخدام Zod
- ✅ حماية من XSS من خلال تنظيف المدخلات
- ✅ CSRF protection من خلال NextAuth
- ✅ Middleware للتحقق من الصلاحيات

## الأوامر المتاحة

```bash
# تطوير
npm run dev

# البناء
npm run build

# الإنتاج
npm start

# التحقق من الأكواد
npm run lint

# إدارة Prisma
npx prisma studio              # واجهة رسومية لقاعدة البيانات
npx prisma migrate dev         # إنشاء جدول جديد
npx prisma db seed            # ملء البيانات الأولية
```

## التكامل مع اليوتيوب

للحصول على فيديوهاتك من اليوتيوب:

1. احصل على مفتاح API من [Google Cloud Console](https://console.cloud.google.com/)
2. أضفه في `.env.local`:
   ```
   NEXT_PUBLIC_YOUTUBE_API_KEY="your-api-key"
   ```

## نصائح التطوير

- استخدم `prisma studio` لمراقبة قاعدة البيانات
- استخدم `npm run dev` مع `--turbopack` لأداء أسرع
- استخدم VS Code extensions:
  - Prisma
  - Tailwind CSS IntelliSense
  - ESLint

## الإنتشار

### على Vercel (الطريقة الموصى بها)

```bash
npm i -g vercel
vercel
```

### على Heroku

```bash
heroku create your-app-name
heroku config:set DATABASE_URL="your-database-url"
git push heroku main
```

## الترخيص

MIT License - استخدم بحرية

## الدعم

للمشاكل والاستفسارات، يرجى فتح issue على GitHub.

---

صُنع بـ ❤️ باستخدام Next.js و Tailwind CSS و TypeScript
