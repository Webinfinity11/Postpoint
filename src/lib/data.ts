import type { Catalog } from "@/types";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { offers } from "@/data/offers";

// ფაზა 1: მონაცემები სტატიკური ფაილებიდან.
// ფაზა 2: ამ ფუნქციების შიგთავსი შეიცვლება ბაზის (Prisma) მოთხოვნებით.
// კომპონენტები ამ ფუნქციებს არ იცნობენ — ისინი იღებენ მონაცემს CatalogProvider-იდან.

export async function getCategories() {
  return categories;
}

export async function getProducts() {
  return products;
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
