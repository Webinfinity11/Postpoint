import "server-only";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { dbCategories, dbProducts, hasDatabase } from "@/lib/db";

// ადმინი ყოველთვის ახალ მონაცემს კითხულობს (ქეშის გარეშე); ბაზის გარეშე — სტატიკურ ფაილებს, მხოლოდ სანახავად
export const adminCategories = () => (hasDatabase ? dbCategories() : Promise.resolve(categories));
export const adminProducts = () => (hasDatabase ? dbProducts() : Promise.resolve(products));
