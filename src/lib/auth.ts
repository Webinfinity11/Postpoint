import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// ადმინის მომხმარებელი: ცვლადები ADMIN_EMAIL და ADMIN_PASSWORD (Railway → Variables).
// რომელიმეს შეცვლა ყველა სესიას აუქმებს.

const COOKIE = "admin_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 დღე

export const isAuthConfigured = () => Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD);

function sign(value: string) {
  const key = createHmac("sha256", "pospoint-admin")
    .update(`${process.env.ADMIN_EMAIL?.toLowerCase()}\n${process.env.ADMIN_PASSWORD}`)
    .digest();
  return createHmac("sha256", key).update(value).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export function checkCredentials(email: string, password: string) {
  if (!isAuthConfigured()) return false;
  // ორივე ყოველთვის მოწმდება, რომ პასუხის დროით ვერ გაიგონ, ელფოსტა იყო სწორი თუ არა
  const emailOk = safeEqual(sign(email.trim().toLowerCase()), sign(process.env.ADMIN_EMAIL!.trim().toLowerCase()));
  const passwordOk = safeEqual(sign(password), sign(process.env.ADMIN_PASSWORD!));
  return emailOk && passwordOk;
}

export async function startSession() {
  const expires = Math.floor(Date.now() / 1000) + MAX_AGE;
  (await cookies()).set(COOKIE, `${expires}.${sign(String(expires))}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function endSession() {
  (await cookies()).delete(COOKIE);
}

export async function isAdmin() {
  if (!isAuthConfigured()) return false;
  const token = (await cookies()).get(COOKIE)?.value ?? "";
  const [expires, signature = ""] = token.split(".");
  return Number(expires) > Date.now() / 1000 && safeEqual(signature, sign(expires));
}

/** Call at the top of every admin page and server action */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}
