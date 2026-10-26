import "server-only";
import { createHmac, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminCredentials, hasDatabase, setAdminCredentials } from "@/lib/db";

// ადმინის ელფოსტა და პაროლი იცვლება ადმინიდან (პარამეტრები) და ინახება ბაზაში, პაროლი — scrypt ჰეშით.
// სანამ ადმინიდან არ შეცვლი, გამოიყენება ცვლადები ADMIN_EMAIL და ADMIN_PASSWORD (Railway → Variables).
// დაგავიწყდა პაროლი? ბაზაში წაშალე ცხრილის admin_credentials ჩანაწერი — ისევ ცვლადები ამოქმედდება.
// ელფოსტის ან პაროლის შეცვლა ყველა სესიას აუქმებს.

const COOKIE = "admin_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 დღე
const scryptAsync = promisify(scrypt) as (password: string, salt: Buffer, keylen: number) => Promise<Buffer>;

type Credentials = {
  email: string;
  /** Session signing material; changes whenever the email or password changes */
  secret: string;
  verify: (password: string) => Promise<boolean>;
  /** true when stored in the database (changed from the admin panel) */
  stored: boolean;
};

function safeEqual(a: string | Buffer, b: string | Buffer) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export async function hashPassword(password: string) {
  const salt = randomBytes(16);
  return `scrypt$${salt.toString("base64")}$${(await scryptAsync(password, salt, 64)).toString("base64")}`;
}

async function verifyHash(password: string, stored: string) {
  const [, salt, hash] = stored.split("$");
  if (!salt || !hash) return false;
  return safeEqual(await scryptAsync(password, Buffer.from(salt, "base64"), 64), Buffer.from(hash, "base64"));
}

async function credentials(): Promise<Credentials | null> {
  const row = hasDatabase ? await getAdminCredentials() : null;
  if (row) {
    return { email: row.email, secret: `${row.email}\n${row.passwordHash}`, verify: (p) => verifyHash(p, row.passwordHash), stored: true };
  }
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) return null;
  return { email, secret: `${email}\n${password}`, verify: async (p) => safeEqual(p, password), stored: false };
}

function sign(value: string, creds: Credentials) {
  const key = createHmac("sha256", "pospoint-admin").update(creds.secret).digest();
  return createHmac("sha256", key).update(value).digest("base64url");
}

export async function isAuthConfigured() {
  return (await credentials()) !== null;
}

export async function checkCredentials(email: string, password: string) {
  const creds = await credentials();
  if (!creds) return false;
  // ორივე ყოველთვის მოწმდება, რომ პასუხის დროით ვერ გაიგონ, ელფოსტა იყო სწორი თუ არა
  const passwordOk = await creds.verify(password);
  const emailOk = safeEqual(email.trim().toLowerCase(), creds.email);
  return emailOk && passwordOk;
}

/** Current admin email, and whether it was set from the admin panel */
export async function currentAdmin() {
  const creds = await credentials();
  return creds ? { email: creds.email, stored: creds.stored } : null;
}

/** Saves a new email and/or password (empty password = keep the current one) and renews this session */
export async function changeCredentials(email: string, newPassword: string) {
  const row = await getAdminCredentials();
  const passwordHash = newPassword ? await hashPassword(newPassword) : row?.passwordHash ?? (await hashPassword(process.env.ADMIN_PASSWORD ?? ""));
  await setAdminCredentials(email.trim().toLowerCase(), passwordHash);
  await startSession();
}

export async function startSession() {
  const creds = await credentials();
  if (!creds) return;
  const expires = Math.floor(Date.now() / 1000) + MAX_AGE;
  (await cookies()).set(COOKIE, `${expires}.${sign(String(expires), creds)}`, {
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
  const token = (await cookies()).get(COOKIE)?.value ?? "";
  if (!token) return false;
  const creds = await credentials();
  if (!creds) return false;
  const [expires, signature = ""] = token.split(".");
  return Number(expires) > Date.now() / 1000 && safeEqual(signature, sign(expires, creds));
}

/** Call at the top of every admin page and server action */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}
