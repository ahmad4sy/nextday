# مسرد المشروع - Ahmad Shehadi Website

## ملف جرد المشروع الكامل

هذا الملف يحتوي على قائمة شاملة بجميع الملفات والمجلدات التي تم إنشاؤها.

### الملفات الأساسية في الجذر 📁

```
├── package.json           ← مكتبات المشروع وأوامر التشغيل
├── tsconfig.json          ← إعدادات TypeScript
├── next.config.js         ← إعدادات Next.js
├── tailwind.config.ts     ← إعدادات Tailwind CSS
├── postcss.config.js      ← إعدادات PostCSS
├── .eslintrc.json         ← إعدادات ESLint
├── .gitignore             ← ملفات مستثناة من Git
├── .env.example           ← مثال متغيرات البيئة
├── .env.local             ← متغيرات البيئة (لا تنشره)
├── README.md              ← دليل المشروع بالإنجليزية
└── SETUP_AR.md            ← دليل الإعداد بالعربية
```

### مجلد Prisma 🗄️

```
prisma/
├── schema.prisma          ← قاعدة البيانات (الجداول والحقول)
└── seed.ts                ← ملء البيانات الأولية
```

**الجداول الرئيسية:**
- `User` - بيانات المسؤول
- `Post` - المقالات
- `Video` - الفيديوهات
- `Page` - الصفحات الإضافية

### مجلد src/

#### src/app/ (Pages & API Routes)

```
src/app/
├── layout.tsx             ← التخطيط الأساسي للموقع
├── page.tsx               ← الصفحة الرئيسية (Home)
├── middleware.ts          ← حماية المسارات الإدارية
│
├── api/                   ← بطرق الـ API
│   ├── auth/[...nextauth]/route.ts  ← المصادقة
│   ├── posts/
│   │   ├── route.ts       ← الحصول على/إنشاء المقالات
│   │   └── [id]/route.ts  ← تعديل/حذف مقالة محددة
│   └── videos/
│       └── route.ts       ← إدارة الفيديوهات
│
├── blog/                  ← صفحات المدونة
│   ├── layout.tsx
│   ├── page.tsx           ← قائمة المقالات
│   └── [slug]/page.tsx    ← صفحة المقالة الفردية
│
├── videos/                ← صفحات الفيديوهات
│   ├── layout.tsx
│   └── page.tsx           ← معرض الفيديوهات
│
└── admin/                 ← لوحة التحكم
    ├── layout.tsx
    ├── page.tsx           ← لوحة التحكم الرئيسية
    ├── login/page.tsx     ← صفحة تسجيل الدخول
    ├── posts/
    │   ├── page.tsx       ← إدارة المقالات
    │   ├── new/page.tsx   ← إنشاء مقالة جديدة
    │   └── [id]/page.tsx  ← تعديل مقالة (بحاجة إلى إنشاء)
    ├── videos/page.tsx    ← إدارة الفيديوهات
    └── pages/page.tsx     ← إدارة الصفحات الإضافية
```

#### src/components/ (React Components)

```
src/components/
├── ui/                    ← مكونات واجهة المستخدم
│   ├── button.tsx         ← زر
│   ├── input.tsx          ← حقل إدخال
│   ├── textarea.tsx       ← منطقة نصية
│   ├── card.tsx           ← بطاقة
│   └── dialog.tsx         ← نافذة منبثقة
│
├── Navbar.tsx             ← شريط التنقل في الأعلى
├── PostCard.tsx           ← بطاقة المقالة
├── VideoCard.tsx          ← بطاقة الفيديو
├── ThemeWrapper.tsx       ← موفر المظهر (ليل/نهار)
└── ProtectedRoute.tsx     ← حماية المسارات الإدارية
```

#### src/lib/ (Utilities)

```
src/lib/
├── prisma.ts              ← اتصال قاعدة البيانات
├── schemas.ts             ← التحقق من صحة البيانات (Zod)
├── utils.ts               ← دوال مساعدة (تشفير، slug generation)
└── constants.ts           ← الثوابت والقيم الثابتة
```

#### src/styles/ (Styling)

```
src/styles/
└── globals.css            ← أنماط عامة و CSS variables
```

#### src/types/ (Type Definitions)

```
src/types/
└── next-auth.d.ts         ← تعريفات NextAuth
```

### مجلد .github/

```
.github/
└── copilot-instructions.md  ← تعليمات الـ Copilot (هذا الملف)
```

### ملفات أخرى

```
public/                    ← ملفات ثابتة (صور، أيقونات)
```

## علاقات الملفات 🔗

### سير العملية عند تسجيل الدخول:
```
Login Page (admin/login/page.tsx)
    ↓
NextAuth API (api/auth/[...nextauth]/route.ts)
    ↓
Prisma (lib/prisma.ts) → Database
    ↓
Admin Dashboard (admin/page.tsx)
```

### سير العملية عند عرض مقالة:
```
Blog Page (blog/page.tsx)
    ↓
API (api/posts/route.ts)
    ↓
Prisma (lib/prisma.ts) → Database
    ↓
Post Card (components/PostCard.tsx)
```

## أهم الملفات للتعديل 🎯

للقيام بتعديلات شائعة:

1. **تغيير الألوان/المظهر**:
   - File: `src/styles/globals.css`

2. **إضافة عنصر جديد للـ Navbar**:
   - File: `src/components/Navbar.tsx`

3. **تغيير بيانات قاعدة البيانات**:
   - File: `prisma/schema.prisma`
   - ثم: `npx prisma migrate dev --name تعديل`

4. **تغيير نصوص الصفحة الرئيسية**:
   - File: `src/app/page.tsx`

5. **إضافة حقل جديد للمقالات**:
   - File #1: `prisma/schema.prisma` (أضف الحقل)
   - File #2: `src/lib/schemas.ts` (أضف Validation)
   - File #3: `src/app/admin/posts/new/page.tsx` (أضف الحقل في النموذج)

## مفاتيح الملفات المهمة 🔑

### Authentication
- NextAuth Config: `src/app/api/auth/[...nextauth]/route.ts`
- Middleware: `src/middleware.ts`
- Session Types: `src/types/next-auth.d.ts`

### Database
- Schema: `prisma/schema.prisma`
- Seed: `prisma/seed.ts`
- Client: `src/lib/prisma.ts`

### Validation
- Zod Schemas: `src/lib/schemas.ts`

### Styling
- CSS Variables: `src/styles/globals.css`
- Tailwind Config: `tailwind.config.ts`

## الأوامر الأساسية 🚀

```bash
# التطوير
npm run dev
npm run dev -- -p 3001  # تغيير المنفذ

# البناء
npm run build

# الإنتاج
npm start

# التحقق من الأكواد
npm run lint

# الـ Database
npx prisma studio               # واجهة رسومية
npx prisma migrate dev          # إنشاء migration
npx prisma migrate reset        # إعادة البيانات
npx prisma db seed             # ملء البيانات الأولية
npm run prisma:seed            # باستخدام npm script
```

## نصائح مهمة ⚠️

1. **احفظ `.env.local` آمناً** - لا تشاركه مع أحد
2. **استخدم `npx prisma studio`** لرؤية البيانات بشكل مباشر
3. **اختبر التغييرات محلياً أولاً** قبل نشرها
4. **استخدم TypeScript** للأمان والخطأ المبكر
5. **احفظ متغيرات البيئة الحساسة** في ملف `.env.local` فقط

## المشاكل الشائعة وحلولها 🔧

| المشكلة | الحل |
|--------|------|
| Port مشغول | `npm run dev -- -p 3001` |
| Database error | تحقق من `DATABASE_URL` |
| NextAuth error | أعد توليد `NEXTAUTH_SECRET` |
| Build error | احذف `node_modules` و أعد `npm install` |

---

**تم إنشاء هذا المشروع بالكامل** ✅

جميع الملفات جاهزة للعمل الآن!
