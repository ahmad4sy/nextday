# ✅ قائمة الإجراءات الفورية

## 🎯 الخطوات التي يجب اتخاذها الآن

### الخطوة 1️⃣: تثبيت البرامج المطلوبة (30 دقيقة)

#### A. تثبيت Node.js
- [ ] قم بزيارة https://nodejs.org/
- [ ] حمّل النسخة LTS
- [ ] ثبّت البرنامج
- [ ] افتح Terminal/PowerShell وتحقق:
  ```bash
  node --version    # يجب أن تظهر رقم الإصدار
  npm --version     # يجب أن تظهر رقم الإصدار
  ```

#### B. تثبيت PostgreSQL
- [ ] قم بزيارة https://www.postgresql.org/download/
- [ ] حمّل الإصدار المتوافق مع نظامك
- [ ] ثبّت البرنامج (احفظ كلمة المرور)
- [ ] تحقق من التثبيت من PostgreSQL GUI

### الخطوة 2️⃣: إعداد المشروع (15 دقيقة)

#### A. تثبيت المكتبات
```bash
cd "c:\Users\ahmad\Desktop\New folder"
npm install
```

#### B. إعداد متغيرات البيئة
- [ ] افتح ملف `.env.local` بمحرر نصوص
- [ ] غيّر القيم التالية:

```env
# 1. DATABASE_URL - اتصال قاعدة البيانات
DATABASE_URL="postgresql://postgres:PASSWORD@localhost:5432/ahmad_shehadi"
# ⚠️ غيّر PASSWORD بكلمة مرور PostgreSQL

# 2. NEXTAUTH_SECRET - مفتاح الأمان
# شغّل هذا الأمر في Terminal:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
# انسخ النتيجة (مثل: a7c3f8b2d9e1c4f6a8b3d5c7e9f1a2c4...)
NEXTAUTH_SECRET="paste-the-generated-secret-here"

# 3. الباقي لا تغيّره حالياً
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_YOUTUBE_API_KEY="optional"
ADMIN_EMAIL="admin@ahmadshehadi.com"
ADMIN_PASSWORD="password123"
```

#### C. إنشاء قاعدة البيانات
```bash
npx prisma migrate dev --name init
```
اختر اسماً (مثل: `init` أو اضغط Enter)

#### D. ملء البيانات الأولية
```bash
npx prisma db seed
```

### الخطوة 3️⃣: تشغيل المشروع (5 دقائق)

```bash
npm run dev
```

انتظر الرسالة:
```
✓ Ready in 2.5s
◇ Listening on http://localhost:3000
```

### الخطوة 4️⃣: اختبار الموقع (10 دقائق)

#### A. الصفحة الرئيسية
- [ ] افتح في المتصفح: http://localhost:3000
- [ ] تحقق من ظهور الصفحة الرئيسية

#### B. المدونة
- [ ] اضغط على "المقالات" في الـ Navbar
- [ ] يجب أن ترى مقالة "مرحباً بك" الافتراضية

#### C. تسجيل الدخول
- [ ] اضغط على "الإدارة"
- [ ] أدخل البيانات:
  - البريد: `admin@ahmadshehadi.com`
  - كلمة المرور: `password123`
- [ ] يجب أن تصل إلى لوحة التحكم

#### D. إضافة مقالة جديدة
- [ ] من لوحة التحكم → المقالات → مقالة جديدة
- [ ] ملء البيانات:
  ```
  العنوان: مقالتي الأولى
  المحتوى: محتوى المقالة...
  نشر الآن: ✓ (اختر)
  ```
- [ ] اضغط "حفظ المقالة"
- [ ] تحقق من ظهورها في صفحة المدونة

### الخطوة 5️⃣: المخصصات (اختياري)

#### A. تغيير الألوان
- [ ] افتح: `src/styles/globals.css`
- [ ] عدّل أسماء الألوان (هناك تعليقات توضيحية)

#### B. تغيير النصوص
- [ ] افتح: `src/app/page.tsx`
- [ ] عدّل كل النصوص العربية

#### C. إضافة شعارك
- [ ] ضع صورتك في مجلد `public/`
- [ ] عدّل الـ `img src` في المكونات

## 📞 الدعم والمساعدة

### إذا واجهت مشكلة:

**❌ Port 3000 مشغول**
```bash
npm run dev -- -p 3001
```

**❌ Database refused**
- تأكد من تشغيل PostgreSQL
- تحقق من `DATABASE_URL` صحيح

**❌ NextAuth Error**
```bash
# توليد secret جديد
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**❌ Module not found**
```bash
rm -r node_modules
npm install
```

## 📚 الملفات المهمة للقراءة

بعد انتهائك من الخطوات أعلاه، اقرأ:

1. 📖 `GETTING_STARTED_AR.md` - ملخص شامل
2. 📖 `README.md` - الدليل الكامل
3. 📖 `PROJECT_STRUCTURE_AR.md` - شرح البنية
4. 📖 `SETUP_AR.md` - تفاصيل الإعداد

## 🎯 ما بعد البدء

بعد البدء بنجاح:

- [ ] أضف مقالات جديدة تدريجياً
- [ ] ابدأ بإضافة فيديوهات من YouTube
- [ ] خصّص الموقع بألوانك وشعارك
- [ ] اختبر كل الميزات (البحث، الفلترة، الوضع الليلي)
- [ ] قرأ عن القاعدة البيانات: `npx prisma studio`

## 🚀 النشر على الإنترنت (لاحقاً)

عندما تكون مستعداً:

```bash
# للـ Vercel (الأسهل)
npm i -g vercel
vercel

# أو للـ Heroku
heroku create your-app-name
git push heroku main
```

## ⏱️ مقدار الوقت المتوقع

| الخطوة | الوقت |
|-------|-------|
| التثبيت | 30 د |
| الإعداد | 15 د |
| التشغيل | 5 د |
| الاختبار | 10 د |
| **المجموع** | **60 د** |

## ✨ نصائح ذهبية

💡 احتفظ بـ Terminal مفتوحاً (للمطور)
💡 استخدم `npx prisma studio` لرؤية البيانات
💡 اختبر على أجهزة مختلفة
💡 احفظ نسخة احتياطية من `.env.local`
💡 لا تشارك `.env.local` مع أحد

---

## ✅ قائمة النهاية (Checklist)

بعد إكمال جميع الخطوات:

- [ ] Node.js مثبت
- [ ] PostgreSQL مثبت
- [ ] `npm install` نجح
- [ ] `.env.local` معبّأ بشكل صحيح
- [ ] `npx prisma migrate dev` نجح
- [ ] `npx prisma db seed` نجح
- [ ] `npm run dev` يعمل بدون أخطاء
- [ ] http://localhost:3000 يعرض الموقع
- [ ] استطعت الدخول بـ admin@ahmadshehadi.com
- [ ] استطعت إضافة مقالة جديدة
- [ ] **كل شيء تمام! 🎉**

---

**الآن أنت جاهز للبدء!** 🚀

هل لديك أي سؤالات؟ اقرأ الملفات الموثقة أعلاه، وستجد الإجابة.
