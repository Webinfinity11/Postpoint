"use server";

import { randomUUID } from "node:crypto";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import sharp from "sharp";
import type { Category, CategoryIconName, Product, Unit } from "@/types";
import { changeCredentials, checkCredentials, currentAdmin, endSession, isAuthConfigured, requireAdmin, startSession } from "@/lib/auth";
import { CATALOG_TAG } from "@/lib/data";
import { SLUG_PATTERN } from "@/lib/slug";
import {
  createCategory, createProduct, deleteImageIfUnused, saveImage, sql, updateCategory, updateProduct,
} from "@/lib/db";
import { ICONS, IMAGE_MAX_SIDE, IMAGE_QUALITY, MAX_IMAGE_MB, UNITS } from "./constants";

export type FormState = { error?: string };

// ---------- auth ----------

export async function login(_prev: FormState, form: FormData): Promise<FormState> {
  if (!(await isAuthConfigured())) return { error: "ADMIN_EMAIL და ADMIN_PASSWORD ცვლადები არ არის მითითებული." };
  if (!(await checkCredentials(String(form.get("email") ?? ""), String(form.get("password") ?? "")))) {
    await new Promise((r) => setTimeout(r, 800)); // პაროლის გადარჩევის შესანელებლად
    return { error: "ელფოსტა ან პაროლი არასწორია." };
  }
  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}

// ---------- helpers ----------

const text = (form: FormData, key: string) => String(form.get(key) ?? "").trim();

function optionalNumber(form: FormData, key: string) {
  const value = text(form, key).replace(",", ".");
  if (!value) return undefined;
  const n = Number(value);
  if (!Number.isFinite(n) || n < 0) throw new UserError("რიცხვითი ველი არასწორია.");
  return n;
}

class UserError extends Error {}

/** Detects the real image type from its first bytes (the browser-sent type can't be trusted) */
function imageMime(b: Buffer) {
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "image/jpeg";
  if (b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "image/png";
  if (b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP") return "image/webp";
  if (b.toString("ascii", 0, 4) === "GIF8") return "image/gif";
  if (b.toString("ascii", 4, 12) === "ftypavif") return "image/avif";
  return null;
}

/**
 * Shrinks an upload before it goes into the database: at most IMAGE_MAX_SIDE px on the long side,
 * WebP, phone rotation applied, EXIF (location etc.) removed. A 5 MB phone photo ends up around 150–300 KB.
 */
async function compress(data: Buffer, mime: string) {
  try {
    const out = await sharp(data, { animated: mime === "image/gif" || mime === "image/webp" })
      .rotate()
      .resize({ width: IMAGE_MAX_SIDE, height: IMAGE_MAX_SIDE, fit: "inside", withoutEnlargement: true })
      .webp({ quality: IMAGE_QUALITY })
      .toBuffer();
    // An already small WebP can come out bigger — then keep the original
    return mime === "image/webp" && out.length >= data.length ? data : out;
  } catch {
    throw new UserError("სურათი დაზიანებულია ან ვერ წაიკითხა — სცადე სხვა ფაილი.");
  }
}

/** Returns the image path to store: a new upload, the current one, or "" when removed */
async function resolveImage(form: FormData) {
  const file = form.get("imageFile");
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) throw new UserError(`სურათი არ უნდა აღემატებოდეს ${MAX_IMAGE_MB} MB-ს.`);
    const data = Buffer.from(await file.arrayBuffer());
    const mime = imageMime(data);
    if (!mime) throw new UserError("დასაშვებია მხოლოდ JPG, PNG, WEBP, GIF ან AVIF სურათი.");
    return saveImage(randomUUID(), "image/webp", await compress(data, mime));
  }
  return form.get("removeImage") === "on" ? "" : text(form, "image");
}

function dbError(error: unknown): FormState {
  if (error instanceof UserError) return { error: error.message };
  const code = (error as { code?: string }).code;
  if (code === "23505") return { error: "ასეთი ID უკვე არსებობს — აირჩიე სხვა." };
  if (code === "23001" || code === "23503") return { error: "კატეგორიაში ჯერ კიდევ არის პროდუქტები — ჯერ ისინი გადაიტანე ან წაშალე." };
  console.error(error);
  return { error: "შენახვა ვერ მოხერხდა. სცადე თავიდან." };
}

function checkId(id: string) {
  if (!SLUG_PATTERN.test(id)) throw new UserError("ID: მხოლოდ ლათინური პატარა ასოები, ციფრები და ტირე (მაგ. pos-terminal).");
}

// ---------- categories ----------

export async function saveCategory(_prev: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  const isNew = form.get("isNew") === "1";
  const previousImage = text(form, "image");
  let image = "";
  try {
    const icon = text(form, "icon") as CategoryIconName;
    const category: Category = {
      id: text(form, "id"),
      name: text(form, "name"),
      description: text(form, "description"),
      caption: text(form, "caption"),
      note: text(form, "note") || undefined,
      icon: ICONS.some((i) => i.value === icon) ? icon : "monitor",
      tint: /^#[0-9a-f]{6}$/i.test(text(form, "tint")) ? text(form, "tint") : "#F0F3F8",
      sortOrder: Math.round(optionalNumber(form, "sortOrder") ?? 0),
      image: "",
    };
    checkId(category.id);
    if (!category.name) throw new UserError("სახელი სავალდებულოა.");

    image = category.image = await resolveImage(form);
    await (isNew ? createCategory(category) : updateCategory(category));
  } catch (error) {
    if (image && image !== previousImage) await deleteImageIfUnused(image);
    return dbError(error);
  }
  if (previousImage !== image) await deleteImageIfUnused(previousImage);
  revalidateTag(CATALOG_TAG);
  redirect("/admin/categories?saved=1");
}

export async function deleteCategory(id: string): Promise<FormState> {
  await requireAdmin();
  try {
    const [row] = await sql<{ image: string }>("DELETE FROM categories WHERE id=$1 RETURNING image", [id]);
    if (row) await deleteImageIfUnused(row.image);
  } catch (error) {
    return dbError(error);
  }
  revalidateTag(CATALOG_TAG);
  return {};
}

// ---------- products ----------

export async function saveProduct(_prev: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  const isNew = form.get("isNew") === "1";
  const previousImage = text(form, "image");
  let image = "";
  try {
    const unit = text(form, "unit") as Unit;
    const labels = form.getAll("specLabel").map(String);
    const values = form.getAll("specValue").map(String);
    const specs = labels
      .map((label, i) => ({ label: label.trim(), value: (values[i] ?? "").trim() }))
      .filter((s) => s.label || s.value);
    const rank = optionalNumber(form, "bestSellerRank");

    const product: Product = {
      id: text(form, "id"),
      name: text(form, "name"),
      categoryId: text(form, "categoryId"),
      price: optionalNumber(form, "price") ?? 0,
      oldPrice: optionalNumber(form, "oldPrice"),
      unit: UNITS.some((u) => u.value === unit) ? unit : "pc",
      description: text(form, "description"),
      source: text(form, "source"),
      isDemo: form.get("isDemo") === "on",
      specs,
      isWeeklyPick: form.get("isWeeklyPick") === "on",
      bestSellerRank: rank ? Math.round(rank) : undefined,
      sortOrder: Math.round(optionalNumber(form, "sortOrder") ?? 0),
      image: "",
    };
    checkId(product.id);
    if (!product.name) throw new UserError("სახელი სავალდებულოა.");
    if (!product.categoryId) throw new UserError("აირჩიე კატეგორია.");

    image = product.image = await resolveImage(form);
    await (isNew ? createProduct(product) : updateProduct(product));
  } catch (error) {
    if (image && image !== previousImage) await deleteImageIfUnused(image);
    return dbError(error);
  }
  if (previousImage !== image) await deleteImageIfUnused(previousImage);
  revalidateTag(CATALOG_TAG);
  redirect("/admin/products?saved=1");
}

export async function deleteProduct(id: string): Promise<FormState> {
  await requireAdmin();
  try {
    const [row] = await sql<{ image: string }>("DELETE FROM products WHERE id=$1 RETURNING image", [id]);
    if (row) await deleteImageIfUnused(row.image);
  } catch (error) {
    return dbError(error);
  }
  revalidateTag(CATALOG_TAG);
  return {};
}

// ---------- settings ----------

export async function saveCredentials(_prev: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  const email = text(form, "email").toLowerCase();
  const current = String(form.get("currentPassword") ?? "");
  const next = String(form.get("newPassword") ?? "");
  const repeat = String(form.get("repeatPassword") ?? "");

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "ელფოსტა არასწორია." };
  if (next && next.length < 8) return { error: "ახალი პაროლი მინიმუმ 8 სიმბოლო უნდა იყოს." };
  if (next !== repeat) return { error: "ახალი პაროლები ერთმანეთს არ ემთხვევა." };
  const admin = await currentAdmin();
  if (!admin || !(await checkCredentials(admin.email, current))) {
    await new Promise((r) => setTimeout(r, 800));
    return { error: "მიმდინარე პაროლი არასწორია." };
  }
  try {
    await changeCredentials(email, next);
  } catch (error) {
    return dbError(error);
  }
  redirect("/admin/settings?saved=1");
}
