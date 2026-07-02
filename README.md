# ShortLink · URL Shortener

> 🇬🇧 English version — [النسخة العربية →](README.ar.md)

A modern URL shortener built with **Node.js + Express + TypeScript + Prisma + PostgreSQL**, featuring a dark-themed glassmorphism UI.

## Features

- **Short link generation** — NanoID-based (secure & fast)
- **Instant redirect** — HTTP 301 with click tracking
- **Link info** — query original URL, visit count, timestamps
- **Link deletion** — remove shortened links
- **Expiration support** — `expiresAt` for time-limited links
- **Duplicate prevention** — returns existing short code for the same URL
- **Rate limiting** — protection via `express-rate-limit`
- **Security** — Helmet for HTTP headers, CORS for domain control
- **Zod validation** — request body validation at the API layer
- **Frontend UI** — modern dark design (glassmorphism, gradients, one-click copy)

## Tech Stack

| Technology | Purpose |
|---|---|
| **Express 5** | Web framework |
| **TypeScript 6** | Language with strict mode |
| **Prisma 7** | ORM & database management |
| **PostgreSQL** | Relational database |
| **Zod 4** | Schema validation |
| **NanoID** | Secure random ID generation |
| **Helmet** | HTTP security headers |
| **express-rate-limit** | Request throttling |
| **tsx** | Dev server (TypeScript execution) |

## Project Structure

```
src/
├── config/
│   ├── env.ts          # Environment config (Zod-validated)
│   └── database.ts     # Prisma client with PostgreSQL adapter
├── repositories/
│   └── urlRepository.ts # Data access layer (CRUD)
├── services/
│   ├── urlService.ts   # Business logic
│   └── codeGenerator.ts # Short code generation
├── controllers/
│   └── urlController.ts # Request/response handling
├── routes/
│   ├── index.ts        # Route aggregation
│   └── urlRoutes.ts    # API route definitions
├── middleware/
│   ├── validation.ts   # Zod-based request validation
│   ├── errorHandler.ts # Global error handling
│   └── rateLimiter.ts  # Rate limiting middleware
├── schemas/
│   └── urlSchema.ts    # Zod validation schemas
├── utils/
│   ├── constants.ts    # HTTP status codes, alphabet, limits
│   └── apiResponse.ts  # Unified response format
├── public/
│   ├── index.html      # Frontend UI
│   ├── style.css       # Glassmorphism dark theme
│   └── app.js          # Frontend logic
├── app.ts              # Express app setup
└── server.ts           # Entry point
```

## Requirements

- **Node.js** >= 18
- **PostgreSQL** >= 14 (or Docker)
- **npm** or **yarn**

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Start PostgreSQL

**Using Docker (recommended for development):**

```bash
docker run -d --name url-shortener-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=url_shortener \
  -p 5432:5432 \
  pgvector/pgvector:pg16
```

**Or use a local PostgreSQL** instance — create a database named `url_shortener` and make sure your `.env` matches.

### 3. Configure environment

```bash
cp .env .env.example   # if .env doesn't exist
```

Required environment variables in `.env`:

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3000` | Server port |
| `NODE_ENV` | `development` | Environment |
| `DATABASE_URL` | — | PostgreSQL connection string |
| `BASE_URL` | `http://localhost:3000` | Base URL for shortened links |
| `SHORT_CODE_LENGTH` | `6` | Short code character length |
| `RATE_LIMIT_WINDOW_MS` | `900000` | Rate limit window (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | `100` | Max requests per window |

### 4. Run database migration

```bash
npm run db:migrate
```

### 5. Start the server

**Development (with hot reload):**

```bash
npm run dev
```

**Production:**

```bash
npm run build && npm start
```

Server runs at: `http://localhost:3000`

## API

### Create short URL

```
POST /api/v1/shorten
Content-Type: application/json

{
  "url": "https://example.com/very/long/url"
}
```

**Response:**
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

### Redirect

```
GET /:code
```

HTTP 301 redirect to the original URL. Click count is incremented.

### Get URL info

```
GET /api/v1/urls/:code
```

**Response:**
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

### Delete URL

```
DELETE /api/v1/urls/:code
```

**Response:**
```json
{
  "success": true,
  "message": "Short URL deleted successfully",
  "data": null
}
```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with tsx watch |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run compiled production build |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:push` | Push schema directly to database |
| `npm run db:studio` | Open Prisma Studio (GUI data browser) |
| `npm run db:generate` | Regenerate Prisma client |

## Error Response Format

All errors follow a consistent format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Field-specific error messages"]
}
```

## License

ISC
