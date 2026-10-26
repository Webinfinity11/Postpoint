# Pospoint

Pospoint's Georgian retail equipment catalog, built with Next.js, React, TypeScript and PostgreSQL.

## Local development

```sh
npm ci
cp .env.example .env.local   # fill DATABASE_URL and ADMIN_PASSWORD
npm run dev
```

Open http://localhost:3000 (site) and http://localhost:3000/admin (admin panel).

Without `DATABASE_URL` the site shows the static catalog from `src/data` and the admin panel is read-only.
For local work you can use the Railway database's public URL (Postgres → Connect → Public Network).

## Admin panel (`/admin`)

- **პროდუქტები** — add / edit / delete, photo upload, price and old price, unit, category, specs, "Weekly" and "Most Selling" flags, order.
- **კატეგორიები** — add / edit / delete, category image, fallback icon, background tint, order.
  A category with products can't be deleted.

Login is an email and password. They start from `ADMIN_EMAIL` / `ADMIN_PASSWORD` and can then be changed in
**პარამეტრები** (stored in the `admin_credentials` table, password hashed with scrypt). Forgot the password?
Delete the `admin_credentials` row (Railway → Postgres → Data) and the variables apply again. Changes appear on the site immediately.

## Data

- Tables are created automatically on the first request. An empty database is filled from `src/data/categories.ts` and `src/data/products.ts`.
- Uploaded images (JPG/PNG/WEBP/GIF/AVIF, up to 10 MB) are compressed with `sharp` (WebP, max 1600 px, EXIF removed),
  stored in the `images` table and served from `/media/<id>`, so no volume or separate storage service is needed.
  Replacing, removing or deleting an image also deletes it from the database.
- Offers, texts, FAQ and contacts are still edited in `src/data/*.ts`.

## Railway

1. New project → **Deploy from GitHub repo** (this repo).
2. **+ New → Database → PostgreSQL**.
3. In the app service → **Variables**:
   - `DATABASE_URL` → *Add reference* → `Postgres.DATABASE_URL`
   - `ADMIN_EMAIL` → admin login email
   - `ADMIN_PASSWORD` → admin password
4. **Settings → Networking → Generate Domain**.

Railway runs `npm run build` and `npm start` automatically; `next start` listens on Railway's `PORT`.
Pages are rendered on request, so the database is not needed during the build.

Product prices and checkout are for demonstration. Cart and favorites are stored locally in the browser.
