# ShortLink · رابط مختصر

> 🇸🇦 النسخة العربية — [English version →](README.md)

مُختصر روابط مبني على **Node.js + Express + TypeScript + Prisma + PostgreSQL**، مع واجهة أمامية داكنة عصرية.

## المميزات

- **توليد روابط قصيرة** — باستخدام NanoID (خوارزمية آمنة وسريعة)
- **إعادة توجيه فوري** — HTTP 301 مع تتبع عدد النقرات
- **معلومات الرابط** — استعلام عن الرابط الأصلي وعدد الزيارات والتاريخ
- **حذف الرابط** — إمكانية حذف الرابط المختصر
- **التحقق من الصلاحية** — يدعم `expiresAt` للروابط المؤقتة
- **منع التكرار** — إرجاع الرابط المختصر نفسه إذا كان الرابط الأصلي موجودًا
- **معدل طلبات (Rate Limiting)** — حماية من الإساءة باستخدام `express-rate-limit`
- **أمان** — Helmet للرؤوس الأمنية و CORS للتحكم بالنطاقات المسموحة
- **توثيق Zod** — التحقق من صحة البيانات في طبقة الـ API
- **واجهة أمامية** — تصميم داكن حديث (Glassmorphism + تدرجات لونية + نسخ بنقرة واحدة)

## التقنيات

| التقنية | الاستخدام |
|---|---|
| **Express 5** | إطار عمل الخادم |
| **TypeScript 6** | لغة البرمجة مع أنماط صارمة |
| **Prisma 7** | ORM لإدارة قاعدة البيانات |
| **PostgreSQL** | قاعدة البيانات العلائقية |
| **Zod 4** | التحقق من صحة البيانات |
| **NanoID** | توليد أكواد عشوائية آمنة |
| **Helmet** | أمان HTTP headers |
| **express-rate-limit** | تحديد معدل الطلبات |
| **tsx** | تشغيل TypeScript مباشرة في بيئة التطوير |

## هيكل المشروع

```
src/
├── config/
│   ├── env.ts          # إعدادات البيئة (Zod validation)
│   └── database.ts     # اتصال Prisma مع PostgreSQL
├── repositories/
│   └── urlRepository.ts # طبقة الوصول للبيانات (CRUD)
├── services/
│   ├── urlService.ts   # منطق الأعمال
│   └── codeGenerator.ts # توليد الأكواد المختصرة
├── controllers/
│   └── urlController.ts # معالجة الطلبات والردود
├── routes/
│   ├── index.ts        # تجميع المسارات
│   └── urlRoutes.ts    # مسارات API
├── middleware/
│   ├── validation.ts   # التحقق من صحة البيانات
│   ├── errorHandler.ts # معالجة الأخطاء
│   └── rateLimiter.ts  # تحديد معدل الطلبات
├── schemas/
│   └── urlSchema.ts    # مخططات Zod
├── utils/
│   ├── constants.ts    # الثوابت (HTTP_STATUS, alphabet...)
│   └── apiResponse.ts  # توحيد شكل الردود
├── public/
│   ├── index.html      # الواجهة الأمامية
│   ├── style.css       # أنماط CSS
│   └── app.js          # منطق الواجهة
├── app.ts              # إعداد Express
└── server.ts           # نقطة الدخول
```

## المتطلبات

- **Node.js** >= 18
- **PostgreSQL** >= 14 (أو Docker)
- **npm** أو **yarn**

## التشغيل

### 1. تثبيت الاعتماديات

```bash
npm install
```

### 2. إعداد قاعدة البيانات

**باستخدام Docker (مُوصى به للتطوير):**

```bash
docker run -d --name url-shortener-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=url_shortener \
  -p 5432:5432 \
  pgvector/pgvector:pg16
```

**أو باستخدام PostgreSQL محلي:**

أنشئ قاعدة بيانات باسم `url_shortener` وتأكد من أن بيانات الاتصال تطابق ملف `.env`.

### 3. إعداد متغيرات البيئة

```bash
cp .env .env.example   # إذا لم يكن .env موجودًا
```

المتغيرات المطلوبة في `.env`:

| المتغير | القيمة الافتراضية | الشرح |
|---|---|---|
| `PORT` | `3000` | منفذ الخادم |
| `NODE_ENV` | `development` | البيئة |
| `DATABASE_URL` | — | رابط اتصال PostgreSQL |
| `BASE_URL` | `http://localhost:3000` | الرابط الأساسي للروابط المختصرة |
| `SHORT_CODE_LENGTH` | `6` | طول الكود المختصر |
| `RATE_LIMIT_WINDOW_MS` | `900000` | نافذة معدل الطلبات (15 دقيقة) |
| `RATE_LIMIT_MAX_REQUESTS` | `100` | الحد الأقصى للطلبات لكل نافذة |

### 4. ترحيل قاعدة البيانات

```bash
npm run db:migrate
```

### 5. تشغيل الخادم

**تطوير (مع إعادة تحميل تلقائي):**

```bash
npm run dev
```

**إنتاج:**

```bash
npm run build && npm start
```

الخادم يعمل على: `http://localhost:3000`

## API

### إنشاء رابط مختصر

```
POST /api/v1/shorten
Content-Type: application/json

{
  "url": "https://example.com/very/long/url"
}
```

**الرد:**
```json
{
  "success": true,
  "message": "Short URL created successfully",
  "data": {
    "originalUrl": "https://example.com/very/long/url",
    "shortCode": "Ab3xYz",
    "shortUrl": "http://localhost:3000/Ab3xYz"
  }
}
```

### إعادة التوجيه

```
GET /:code
```

يعيد توجيه HTTP 301 إلى الرابط الأصلي.

### معلومات الرابط

```
GET /api/v1/urls/:code
```

**الرد:**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "originalUrl": "https://example.com/very/long/url",
    "shortCode": "Ab3xYz",
    "clicks": 5,
    "createdAt": "2026-07-02T19:19:48.790Z",
    "expiresAt": null
  }
}
```

### حذف الرابط

```
DELETE /api/v1/urls/:code
```

**الرد:**
```json
{
  "success": true,
  "message": "Short URL deleted successfully",
  "data": null
}
```

## الأوامر

| الأمر | الشرح |
|---|---|
| `npm run dev` | تشغيل في بيئة التطوير مع tsx watch |
| `npm run build` | ترجمة TypeScript إلى JavaScript |
| `npm start` | تشغيل الإصدار المُجمّع |
| `npm run db:migrate` | تشغيل ترحيلات Prisma |
| `npm run db:push` | دفع الـ schema مباشرة إلى قاعدة البيانات |
| `npm run db:studio` | فتح Prisma Studio (واجهة رسومية للبيانات) |
| `npm run db:generate` | إعادة توليد عميل Prisma |

## الترخيص

ISC
