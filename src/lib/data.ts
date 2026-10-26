import "server-only";
import { unstable_cache } from "next/cache";
import type { Catalog } from "@/types";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { offers } from "@/data/offers";
import { dbCategories, dbProducts, hasDatabase } from "@/lib/db";

// DATABASE_URL არსებობისას კატეგორიები და პროდუქტები ბაზიდან იკითხება (ადმინ პანელიდან იმართება).
// მის გარეშე (მაგ. ლოკალურად) — სტატიკური ფაილებიდან src/data/*.
// კომპონენტები ამ ფუნქციებს არ იცნობენ — ისინი იღებენ მონაცემს CatalogProvider-იდან.

/** Cache tag cleared by the admin panel after every change */
export const CATALOG_TAG = "catalog";

const cachedCategories = unstable_cache(dbCategories, ["categories"], { tags: [CATALOG_TAG] });
const cachedProducts = unstable_cache(dbProducts, ["products"], { tags: [CATALOG_TAG] });

export async function getCategories() {
  return hasDatabase ? cachedCategories() : categories;
}

export async function getProducts() {
  return hasDatabase ? cachedProducts() : products;
}

export async function getOffers() {
  return offers;
}

export async function getCatalog(): Promise<Catalog> {
  const [c, p, o] = await Promise.all([getCategories(), getProducts(), getOffers()]);
  return { categories: c, products: p, offers: o };
}

export async function getCategory(id: string) {
  return (await getCategories()).find((c) => c.id === id) ?? null;
}

export async function getProduct(id: string) {
  return (await getProducts()).find((p) => p.id === id) ?? null;
}
