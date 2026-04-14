# دليل الإعداد السريع

## المتطلبات الأساسية

يجب تثبيت البرامج التالية على جهاز الكمبيوتر الخاص بك:

### 1. Node.js و npm

1. **قم بتحميل Node.js** من https://nodejs.org/ (اختر النسخة LTS الحالية)
2. **ثبّت البرنامج** باتباع التعليمات
3. **تحقق من التثبيت** بفتح Terminal/PowerShell وكتابة:
   ```bash
   node --version
   npm --version
   ```

### 2. PostgreSQL

1. **قم بتحميل PostgreSQL** من https://www.postgresql.org/download/
2. **ثبّت البرنامج** واحفظ كلمة المرور الافتراضية
3. **تحقق من التثبيت** بإنشاء قاعدة بيانات جديدة

## خطوات الإعداد

### الخطوة 1: تثبيت المشروع

1. افتح Terminal/PowerShell
2. انتقل إلى مجلد المشروع:
   ```bash
   cd "path/to/ahmad-shehadi"
   ```

3. ثبّت المكتبات:
   ```bash
   npm install
   ```
   (قد يستغرق بضع دقائق)

### الخطوة 2: إعداد قاعدة البيانات

1. **انسخ ملف البيئة**:
   ```bash
   copy .env.example .env.local
   ```

2. **عدّل ملف `.env.local`** بمحرر نصوص وغيّر قيم المتغيرات:

   ```env
   # أولاً: DATABASE_URL
   # الصيغة:
   DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
   
   # مثال حقيقي (إذا كان اسمك postgres وكلمة المرور postgres):
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ahmad_shehadi"
   
   # ثانياً: NEXTAUTH_SECRET
   # انسخ الأمر التالي في Terminal:
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   # ثم انسخ النتيجة هنا:
   NEXTAUTH_SECRET="paste-the-generated-secret-here"
   
   # ثالثاً: NEXTAUTH_URL
   NEXTAUTH_URL="http://localhost:3000"
   
   # رابعاً: بيانات الإدارة
   ADMIN_EMAIL="admin@ahmadshehadi.com"
   ADMIN_PASSWORD="yourSecurePassword123"
   ```

3. **أنشئ قاعدة البيانات**:
   ```bash
   npx prisma migrate dev --name init
   ```

4. **ملء البيانات الأولية**:
   ```bash
   npx prisma db seed
   ```

### الخطوة 3: تشغيل المشروع

```bash
npm run dev
```

ثم افتح في المتصفح: **http://localhost:3000**

## اختبار التثبيت

### الصفحة الرئيسية
- افتح http://localhost:3000
- يجب أن ترى الصفحة الرئيسية بتصميم عصري

### الدخول إلى لوحة التحكم
1. اضغط على "الإدارة" في الـ Navbar
2. ستُحوّل إلى صفحة تسجيل الدخول
3. أدخل:
   - البريد: admin@ahmadshehadi.com
   - كلمة المرور: (ما أدخلته في ADMIN_PASSWORD)

4. بعد الدخول، ستجد لوحة التحكم بخيارات:
   - إدارة المقالات
   - إدارة الفيديوهات
   - إدارة الصفحات

## الأوامر المفيدة

```bash
# تشغيل المشروع
npm run dev

# النسخة الإنتاجية
npm run build
npm start

# فتح واجهة قاعدة البيانات (Prisma Studio)
npx prisma studio

# التحقق من الأكواد
npm run lint
```

## استكشاف الأخطاء

### الخطأ: `Cannot find module`
**الحل**: أعد تثبيت المكتبات:
```bash
rm -r node_modules
npm install
```

### الخطأ: `DATABASE_URL is not defined`
**الحل**: تأكد من أن ملف `.env.local` موجود وأن `DATABASE_URL` مكتوبة بشكل صحيح

### الخطأ: `PostgreSQL connection failed`
**الحل**: 
- تأكد من تشغيل خدمة PostgreSQL
- تحقق من أن البيانات المدخلة صحيحة: اسم المستخدم وكلمة المرور

### الخطأ: `Port 3000 is already in use`
**الحل**: غيّر المنفذ:
```bash
npm run dev -- -p 3001
```

## النقطة التالية

بعد اكتمال الإعداد:

1. **أضف مقالتك الأولى**:
   - اذهب إلى لوحة التحكم → المقالات → مقالة جديدة
   - ملء النموذج وانقر "حفظ"

2. **أضف فيديوهات**:
   - احصل على معرّف اليوتيوب من الرابط (مثل: `dQw4w9WgXcQ`)
   - أضفه في لوحة التحكم

3. **خصّص الموقع**:
   - عدّل الألوان في `src/styles/globals.css`
   - غيّر النصوص والشعارات

## الحصول على المساعدة

إذا واجهت مشاكل:

1. تحقق من ملف `README.md` للمزيد من التفاصيل
2. اطلع على دوكومنتيشن [Next.js](https://nextjs.org/docs/)
3. اطلع على دوكومنتيشن [Prisma](https://www.prisma.io/docs/)

---

**نصيحة**: احفظ هذا الملف للرجوع إليه لاحقاً! 📝
