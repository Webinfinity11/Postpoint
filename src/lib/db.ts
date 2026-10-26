import "server-only";
import { Pool, type PoolClient } from "pg";
import type { Category, Product } from "@/types";
import { categories as seedCategories } from "@/data/categories";
import { products as seedProducts } from "@/data/products";

// Railway: Postgres სერვისის DATABASE_URL ცვლადი (Variables → Add reference → Postgres.DATABASE_URL).
// ცხრილები პირველი მოთხოვნისას იქმნება, ცარიელი ბაზა კი src/data/*-დან ივსება.

export const hasDatabase = Boolean(process.env.DATABASE_URL);

const globalForDb = globalThis as unknown as { pgPool?: Pool; pgReady?: Promise<void> };

function pool() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
  globalForDb.pgPool ??= new Pool({ connectionString: process.env.DATABASE_URL, max: 5 });
  return globalForDb.pgPool;
}

const schema = `
CREATE TABLE IF NOT EXISTS categories (
  id          text PRIMARY KEY,
  name        text NOT NULL,
  description text NOT NULL DEFAULT '',
  caption     text NOT NULL DEFAULT '',
  note        text,
  image       text NOT NULL DEFAULT '',
  icon        text NOT NULL DEFAULT 'monitor',
  tint        text NOT NULL DEFAULT '#F0F3F8',
  sort_order  integer NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS products (
  id               text PRIMARY KEY,
  name             text NOT NULL,
  category_id      text NOT NULL REFERENCES categories(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  image            text NOT NULL DEFAULT '',
  price            numeric(12,2) NOT NULL DEFAULT 0,
  old_price        numeric(12,2),
  unit             text NOT NULL DEFAULT 'pc',
  description      text NOT NULL DEFAULT '',
  source           text NOT NULL DEFAULT '',
  is_demo          boolean NOT NULL DEFAULT false,
  specs            jsonb NOT NULL DEFAULT '[]',
  is_weekly_pick   boolean NOT NULL DEFAULT false,
  best_seller_rank integer,
  sort_order       integer NOT NULL DEFAULT 0,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS products_category_idx ON products(category_id);
CREATE TABLE IF NOT EXISTS images (
  id         text PRIMARY KEY,
  mime       text NOT NULL,
  data       bytea NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
`;

async function setup() {
  const client = await pool().connect();
  try {
    await client.query("BEGIN");
    // ერთდროულად გაშვებულმა ინსტანციებმა ცხრილები ორჯერ რომ არ შექმნან
    await client.query("SELECT pg_advisory_xact_lock(724501)");
    await client.query(schema);
    const { rows } = await client.query("SELECT count(*)::int AS n FROM categories");
    if (rows[0].n === 0) await seed(client);
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

async function seed(client: PoolClient) {
  for (const [i, c] of seedCategories.entries()) await insertCategory(client, c, i);
  for (const [i, p] of seedProducts.entries()) await insertProduct(client, p, i);
}

function ready() {
  globalForDb.pgReady ??= setup().catch((error) => {
    globalForDb.pgReady = undefined;
    throw error;
  });
  return globalForDb.pgReady;
}

/** Runs a query after making sure the tables exist */
export async function sql<T = Record<string, unknown>>(text: string, values: unknown[] = []) {
  await ready();
  return (await pool().query(text, values)).rows as T[];
}

// ---------- row ↔ type ----------

type CategoryRow = {
  id: string; name: string; description: string; caption: string; note: string | null;
  image: string; icon: Category["icon"]; tint: string; sort_order: number;
};

type ProductRow = {
  id: string; name: string; category_id: string; image: string; price: string; old_price: string | null;
  unit: Product["unit"]; description: string; source: string; is_demo: boolean;
  specs: { label: string; value: string }[]; is_weekly_pick: boolean; best_seller_rank: number | null; sort_order: number;
};

function toCategory(r: CategoryRow): Category {
  return {
    id: r.id, name: r.name, description: r.description, caption: r.caption,
    ...(r.note ? { note: r.note } : {}),
    image: r.image, icon: r.icon, tint: r.tint, sortOrder: r.sort_order,
  };
}

function toProduct(r: ProductRow): Product {
  return {
    id: r.id, name: r.name, categoryId: r.category_id, image: r.image, price: Number(r.price),
    ...(r.old_price != null ? { oldPrice: Number(r.old_price) } : {}),
    unit: r.unit, description: r.description, source: r.source,
    ...(r.is_demo ? { isDemo: true } : {}),
    ...(r.specs.length ? { specs: r.specs } : {}),
    ...(r.is_weekly_pick ? { isWeeklyPick: true } : {}),
    ...(r.best_seller_rank != null ? { bestSellerRank: r.best_seller_rank } : {}),
    sortOrder: r.sort_order,
  };
}

// ---------- queries ----------

export async function dbCategories() {
  return (await sql<CategoryRow>("SELECT * FROM categories ORDER BY sort_order, created_at")).map(toCategory);
}

export async function dbProducts() {
  return (await sql<ProductRow>("SELECT * FROM products ORDER BY sort_order, created_at")).map(toProduct);
}

type Queryable = Pick<PoolClient, "query">;

function categoryValues(c: Category, sortOrder: number) {
  return [c.id, c.name, c.description, c.caption, c.note || null, c.image, c.icon, c.tint, sortOrder];
}

function productValues(p: Product, sortOrder: number) {
  return [
    p.id, p.name, p.categoryId, p.image, p.price, p.oldPrice ?? null, p.unit, p.description, p.source,
    Boolean(p.isDemo), JSON.stringify(p.specs ?? []), Boolean(p.isWeeklyPick), p.bestSellerRank ?? null, sortOrder,
  ];
}

async function insertCategory(db: Queryable, c: Category, sortOrder = c.sortOrder ?? 0) {
  await db.query(
    `INSERT INTO categories (id, name, description, caption, note, image, icon, tint, sort_order)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
    categoryValues(c, sortOrder),
  );
}

async function insertProduct(db: Queryable, p: Product, sortOrder = p.sortOrder ?? 0) {
  await db.query(
    `INSERT INTO products (id, name, category_id, image, price, old_price, unit, description, source,
       is_demo, specs, is_weekly_pick, best_seller_rank, sort_order)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`,
    productValues(p, sortOrder),
  );
}

export async function createCategory(c: Category) {
  await ready();
  await insertCategory(pool(), c);
}

export async function updateCategory(c: Category) {
  await sql(
    `UPDATE categories SET name=$2, description=$3, caption=$4, note=$5, image=$6, icon=$7, tint=$8,
       sort_order=$9, updated_at=now() WHERE id=$1`,
    categoryValues(c, c.sortOrder ?? 0),
  );
}

export async function createProduct(p: Product) {
  await ready();
  await insertProduct(pool(), p);
}

export async function updateProduct(p: Product) {
  await sql(
    `UPDATE products SET name=$2, category_id=$3, image=$4, price=$5, old_price=$6, unit=$7, description=$8,
       source=$9, is_demo=$10, specs=$11, is_weekly_pick=$12, best_seller_rank=$13, sort_order=$14, updated_at=now()
     WHERE id=$1`,
    productValues(p, p.sortOrder ?? 0),
  );
}

// ---------- images ----------

export const MEDIA_PREFIX = "/media/";

export async function saveImage(id: string, mime: string, data: Buffer) {
  await sql("INSERT INTO images (id, mime, data) VALUES ($1,$2,$3)", [id, mime, data]);
  return MEDIA_PREFIX + id;
}

export async function getImage(id: string) {
  const [row] = await sql<{ mime: string; data: Buffer }>("SELECT mime, data FROM images WHERE id=$1", [id]);
  return row ?? null;
}

/** Deletes an uploaded image when no category or product uses it any more */
export async function deleteImageIfUnused(path: string) {
  if (!path.startsWith(MEDIA_PREFIX)) return;
  await sql(
    `DELETE FROM images WHERE id=$1
       AND NOT EXISTS (SELECT 1 FROM categories WHERE image=$2)
       AND NOT EXISTS (SELECT 1 FROM products WHERE image=$2)`,
    [path.slice(MEDIA_PREFIX.length), path],
  );
}

