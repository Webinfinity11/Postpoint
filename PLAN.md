# RSLine — ონლაინ მაღაზიის გეგმა (Next.js)

პროტოტიპი: https://freshmart-video-prototype-oct22.akopov43.chatgpt.site
ლოგო: `logo.svg` (ამავე ფოლდერში)

## სტატუსი (2026-10-22)

- ✅ **ფაზა 1 — Frontend დასრულებულია.** `npm run build` გადის, 27/27 ინტერაქციის ტესტი გავიდა (კალათა, ფილტრები, ძებნა, ფავორიტები, მოდალები, კუპონი, localStorage, მობილური 390px).
- 🟡 **ფაზა 2 — Backend / Admin** (2026-10-26): Postgres (`pg`, Railway) + ადმინ პანელი `/admin` — პროდუქტები და კატეგორიები (სურათების ატვირთვით) მზადაა. დარჩა: აქციები/ბანერები, საიტის ტექსტები, შეკვეთები. იხ. README.md.

**გაშვება:** `npm run dev` → http://localhost:3000

**სად რა იცვლება:**

| რა | ფაილი |
|---|---|
| ყველა ტექსტი, ბრენდი, ვალუტა, მიწოდების წესები, კუპონი | `src/data/site.ts` |
| პროდუქტები (ფასი, სურათი, Weekly / Most Selling) | `src/data/products.ts` |
| კატეგორიები | `src/data/categories.ts` |
| 3 აქციის ბარათი | `src/data/offers.ts` |
| FAQ და Policy | `src/data/faq.ts` |
| ფერები | `src/app/globals.css` → `:root` |
| სურათები (placeholder-ები პროტოტიპიდან) | `public/images/` — ჩაანაცვლე იგივე სახელით |

**გადახვევები გეგმიდან:**
- Hero აწყობილია HTML-ით (დიდი "RS Line" წარწერა, badge, პროდუქტის ბარათი), რადგან პროტოტიპის hero სურათში "FreshMart" ეწერა. ცენტრალური სურათი: `public/images/hero.webp`.
- `motion` ბიბლიოთეკა არ დაყენდა — ანიმაციები CSS-ითაა, როგორც პროტოტიპში.
- Burger მენიუს ნაცვლად მობილურზე პროტოტიპის კომპაქტური ნავიგაციაა; Policy / FAQ / Support მობილურზე footer-შია.
- Tailwind ჩართულია მხოლოდ ტოკენებისა და utility კლასებისთვის (preflight-ის გარეშე); კომპონენტების სტილი `globals.css`-შია.
- საიტი მხოლოდ ქართულადაა (`lang="ka"`), ენის ამრჩევი წაშლილია.
- Hero = სლაიდერი 2 სლაიდით (`public/images/hero1.webp`, `hero2.webp`, 2172×724). ტექსტები `src/data/site.ts` → `hero.slides`-შია (ჯერ დროებითი).
- საიტი მთელ სიგანეზეა (ჩარჩოს გარეშე).

**გვერდები:**

| მისამართი | გვერდი | ფაილი |
|---|---|---|
| `/` | მთავარი | `src/app/page.tsx` |
| `/catalog` | კატალოგი (ყველა პროდუქტი + ძიების შედეგები) | `src/app/catalog/page.tsx` |
| `/catalog/<კატეგორია>` | კატეგორიის გვერდი (მაგ. `/catalog/pos`) | `src/app/catalog/[category]/page.tsx` |
| `/product/<პროდუქტი>` | პროდუქტის გვერდი (მაგ. `/product/pos-terminal`) | `src/app/product/[id]/page.tsx` |
| `/contact` | კონტაქტი | `src/app/contact/page.tsx` |

Header, footer, კალათა და მოდალები `src/app/layout.tsx`-შია და ყველა გვერდზე ჩანს. ახალი კატეგორია ან პროდუქტი `src/data/`-ში დამატებისთანავე იღებს საკუთარ გვერდს.

---

პროექტი იყოფა 2 ფაზად:

| ფაზა | რა კეთდება | შედეგი |
|---|---|---|
| **ფაზა 1 — Frontend** | პროტოტიპის 1:1 აწყობა Next.js-ზე, ლოგოს ფერებით, placeholder ტექსტებით/სურათებით | სტატიკური, სრულად მომუშავე საიტი (კალათა, ფავორიტები, ძებნა, ფილტრები) |
| **ფაზა 2 — Backend / Admin** | ბაზა, ადმინ პანელი, პროდუქტების/კატეგორიების/ბანერების მართვა | ფრონტი იკვებება ბაზიდან, კონტენტი იცვლება ადმინიდან |

> ფაზა 1-ში ყველა მონაცემი (პროდუქტები, კატეგორიები, ტექსტები, ბანერები) ინახება `src/data/*.ts` ფაილებში.
> ფაზა 2-ში ეს ფაილები უბრალოდ იცვლება ბაზის წაკითხვით — კომპონენტები არ იცვლება.

---

## 1. ტექნოლოგიური სტეკი

| რა | არჩევანი | რატომ |
|---|---|---|
| Framework | **Next.js 15 (App Router) + TypeScript** | SSR/SSG, Image optimization, მომავალში API routes ადმინისთვის |
| სტილი | **Tailwind CSS v4** + CSS variables | ფერები ერთ ადგილას (`globals.css`), მარტივად შესაცვლელი |
| State | **Zustand** (+ `persist` → localStorage) | კალათა და ფავორიტები, როგორც პროტოტიპშია |
| ხატულები | **lucide-react** | პროტოტიპის ხატულების ზუსტი შესატყვისი (search, heart, bag, user, chevron, headset, plus, minus, check, arrow, menu, x) |
| ანიმაცია | **motion** (`motion/react`) | drawer/modal/toast გადასვლები |
| სურათები | `next/image` + `public/images/` placeholder-ები | შემდეგ შენ ჩაანაცვლებ |
| ფონტი | Inter (Latin) + **Noto Sans Georgian** `next/font/google` | ქართული ტექსტებისთვის მზად |
| Lint/Format | ESLint + Prettier | |

---

## 2. ფერები — პროტოტიპი → ლოგო

ლოგოდან ამოღებული ფერები:

| როლი | HEX |
|---|---|
| ძირითადი მწვანე | `#50b649` |
| ნაცრისფერი | `#a3aeb4` |
| თეთრი | `#ffffff` |

პროტოტიპის ფერების ჩანაცვლება:

| პროტოტიპში | იყო | ხდება | გამოყენება |
|---|---|---|---|
| `--green` | `#075347` | **`#50b649`** | ღილაკები, აქტიური ნავიგაცია, ფასები, ბრენდი |
| green hover | — | `#3f9a39` | ღილაკის hover (ლოგოს მწვანე × 0.85) |
| green dark | — | `#2e7a2a` | ბანერის მუქი ფონი, CTA |
| `--lime` | `#a8ef64` | `#b9e6b5` | ღია მწვანე აქცენტი (badge, progress bar) |
| green tint | `#f0f8f1` | `#eef8ed` | ღია მწვანე ფონები (სექციები) |
| `--muted` | `#727773` | **`#a3aeb4`** | მეორადი ტექსტი, placeholder, ხატულები |
| muted dark | — | `#6f7a80` | მეორადი ტექსტი, სადაც კონტრასტი სჭირდება |
| `--line` | `#e9ebe8` | `#dde2e5` | ბორდერები (ნაცრისფრის ღია ტონი) |
| surface | `#f4f5f3` | `#f3f5f6` | გვერდის/ბარათების ფონი |
| `--ink` | `#151716` | `#1a1d1f` | ძირითადი ტექსტი |
| offer-card 1 | მწვანე gradient `#167653 → #c0d7c9` | `#50b649 → #d6efd3 → #fff` | "10% OFF" ბანერი |
| offer-card 2 | ვარდისფერი gradient `#ce325f → #e9b8c6` | `#a3aeb4 → #e1e6e9 → #fff` | "Free delivery" ბანერი |
| offer-card 3 | ყვითელი gradient `#fff244 → #fff8a4` | `#b9e6b5 → #eef8ed → #fff` | "Family" ბანერი |
| category tints | 6 პასტელი (ლურჯი, ცისფერი, იასამნისფერი, ვარდისფერი, მწვანე, ყვითელი) | `#eef8ed`, `#f3f5f6`, `#e4f3e2`, `#e9edef`, `#d6efd3`, `#dde2e5` | კატეგორიის ბარათების ფონი (მწვანე/ნაცრისფერი მონაცვლეობით) |

`globals.css`-ში ყველაფერი CSS variable-ად იწერება (`--color-primary`, `--color-muted` …), Tailwind-ში `bg-primary`, `text-muted` და ა.შ.

---

## 3. პროტოტიპის სტრუქტურა (რა უნდა აიწყოს)

### 3.1 Header
- **ზედა ზოლი:** ენის ამრჩევი (popover: 🇬🇪 KA / 🇺🇸 EN — ფაზა 1-ში მხოლოდ UI), ძებნის ველი (live ფილტრი), ლოგო ცენტრში (`logo.svg`), მარჯვნივ: LOVED (count), CART (count), Login/Signup
- **ნავიგაციის ზოლი (pill):** Shop · Categories (dropdown კატეგორიებით) · Deals · Fresh Produce · About
- **მეორე pill:** Policy · FAQ's · Help & Support (მოდალები)
- მობილურზე: burger მენიუ + sticky header

### 3.2 Hero
- დიდი სურათი (placeholder), სათაური, ქვეტექსტი, "Shop Now" ღილაკი
- hotspot ღილაკი რეკომენდებულ პროდუქტზე (ხსნის product modal-ს)
- მობილურზე ცალკე ტექსტური ბლოკი + ღილაკი

### 3.3 Popular Categories
- 6 ბარათი: Fresh Vegetables (23), Fruits (18), Dairy & Eggs (08), Bakery (12), Meat & Fish (09), Beverages (13)
- ბარათი = სურათი + სახელი + რაოდენობა, tint ფონით; დაჭერა → ფილტრავს პროდუქტებს
- "Show All" ღილაკი

### 3.4 Today's Fresh Picks (პროდუქტების grid)
- ნაგულისხმევად 10 პროდუქტი, "Show All / Show Less"
- სათაური იცვლება: კატეგორიის სახელი / "Search Results"
- ფილტრის summary + "Clear filters"
- Empty state: "No groceries found"
- **Product card:** ♥ ფავორიტი, სურათი, სახელი, "Local Farmers", ფასი `/ per kg`, "Add to Cart" → ხდება `− 1 +` quantity control

### 3.5 Deals (#deals)
- **Produce banner:** კალათის სურათი + "Fresh Fruits & Vegetables. Delivered Daily." + ღილაკი + დეკორი
- **3 offer card** (gradient ფონით, დაჭერაზე modal):
  1. NEW HERE? ENJOY 10% OFF YOUR FIRST ORDER
  2. FREE DELIVERY ON ORDERS OVER $50
  3. FRESH GROCERIES FOR YOUR FAMILY, WITHOUT HASSLE.

### 3.6 Weekly Best Selling items
- კატეგორიის tab-ები + 5 პროდუქტი არჩეული კატეგორიიდან

### 3.7 Most Selling Products
- 5 ფიქსირებული პროდუქტი

### 3.8 Closing CTA
- "Ready To Fill Your Cart With Freshness?" + "Start Shopping" + სურათი

### 3.9 Footer
- ლოგო, tagline, ტექსტი, "About" ლინკი

### 3.10 Overlay-ები
- **Cart drawer** (მარჯვნიდან): ნივთები, quantity, remove, free-delivery progress bar ($50), კუპონი WELCOME10 (−10%), Subtotal / Delivery ($4.90 ან Free) / Total, "Continue to Checkout"
- **Content modal** (ერთი კომპონენტი, სხვადასხვა შიგთავსით): product detail, favorites list, login/signup, about, policy, FAQ, support, offer detail, checkout preview, order success
- **Toast** (ქვემოთ, 2.6 წმ)

---

## 4. პროექტის სტრუქტურა

```
rsline/
├─ public/
│  ├─ logo.svg
│  └─ images/              # placeholder სურათები (hero, products, categories, promos)
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx        # ფონტები, Header, Footer, overlays
│  │  ├─ page.tsx          # მთავარი გვერდი (ყველა სექცია)
│  │  └─ globals.css       # ფერების ტოკენები
│  ├─ components/
│  │  ├─ layout/           Header, NavPills, SearchBar, LanguageSwitcher, Footer, MobileMenu
│  │  ├─ sections/         Hero, PopularCategories, FreshPicks, DealsBanner, OfferCards,
│  │  │                    WeeklyBest, MostSelling, ClosingCta
│  │  ├─ product/          ProductCard, QuantityControl, FavoriteButton, ProductGrid, EmptyState
│  │  ├─ overlays/         CartDrawer, ContentModal, Toast
│  │  ├─ modals/           ProductModal, FavoritesModal, AuthModal, AboutModal, PolicyModal,
│  │  │                    FaqModal, SupportModal, OfferModal, CheckoutModal, SuccessModal
│  │  └─ ui/               Button, PillButton, IconButton, Badge, SectionHeading
│  ├─ data/                # ← ფაზა 1: აქ იცვლება ყველა ტექსტი/პროდუქტი
│  │  ├─ site.ts           # ბრენდი, tagline, nav, footer, ყველა სტატიკური ტექსტი
│  │  ├─ categories.ts
│  │  ├─ products.ts
│  │  ├─ offers.ts
│  │  └─ faq.ts
│  ├─ lib/
│  │  ├─ data.ts           # getProducts(), getCategories()… (ფაზა 2-ში → DB)
│  │  ├─ money.ts          # ფასის ფორმატი (₾ / $)
│  │  └─ cart.ts           # subtotal, delivery, discount ლოგიკა
│  ├─ store/
│  │  ├─ cart.ts           # Zustand + persist
│  │  ├─ favorites.ts
│  │  └─ ui.ts             # რომელი modal/drawer არის ღია, ფილტრი, ძებნა
│  └─ types/
│     └─ index.ts          # Product, Category, Offer…
├─ PLAN.md
└─ package.json
```

### მონაცემთა ტიპები (ფაზა 2-ის ბაზასთან თავსებადი)

```ts
type Category = { id: string; slug: string; name: string; image: string; tint: string; productCount: number };
type Product  = { id: string; slug: string; name: string; categoryId: string; image: string;
                  price: number; oldPrice?: number; unit: 'kg' | 'pc' | 'basket' | 'bottle';
                  description: string; source: string; isBestSeller?: boolean; isWeeklyPick?: boolean };
type Offer    = { id: string; title: string; text: string; image: string; theme: 'primary' | 'gray' | 'light';
                  modal: { eyebrow: string; title: string; text: string } };
```

### პროტოტიპის მონაცემები (seed ფაზა 1-ისთვის)

**კატეგორიები:** vegetables, fruits, dairy, bakery, meat, beverages (+ pantry — მენიუში არ ჩანს)

**პროდუქტები (18):** Organic Red Tomatoes, Farm Eggs, Fresh Bananas, Fresh Whole Milk, Premium Basmati Rice, Fresh Chicken Breast, Sunflower Oil, Field-Grown Spinach, Fresh Pineapples, Fresh Mangoes, Seedless Green Grapes, Organic Strawberries, Imported Kiwi, Sweet Pomegranates, Ripe Papaya, Fresh Bakery Basket ($5.90), Fresh Orange Juice ($3.50), Fresh Vegetables basket ($18, ძველი ფასი $24). დანარჩენი — $1.33.

**Most Selling:** kiwi, pomegranate, grapes, mangoes, chicken
**Weekly (fruits tab):** grapes, strawberries, kiwi, pomegranate, papaya

**კალათის წესები:** მიწოდება $4.90, უფასო ≥ $50, კუპონი WELCOME10 = −10%, max 99 ცალი თითო პროდუქტზე

---

## 5. ფაზა 1 — Frontend: ნაბიჯები

### ნაბიჯი 0 — ინიციალიზაცია
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
npm i zustand lucide-react motion
```
- `logo.svg` → `public/logo.svg`
- `globals.css`-ში ფერების ტოკენები (სექცია 2)
- ფონტები `layout.tsx`-ში

### ნაბიჯი 1 — Design tokens + UI primitives
- `Button`, `PillButton` (arrow-circle ვარიანტით), `IconButton`, `Badge`, `SectionHeading`
- Radius `22px` ბარათებზე, `30px` ღილაკებზე (პროტოტიპის მიხედვით)

### ნაბიჯი 2 — მონაცემები
- `src/data/*` — პროტოტიპის 18 პროდუქტი, 6 კატეგორია, 3 offer, FAQ, ყველა ტექსტი
- placeholder სურათები `public/images/` (ერთი ზომის, შემდეგ შენ ჩაანაცვლებ სახელების შეუცვლელად)

### ნაბიჯი 3 — Header + Footer
- Desktop header 2 ზოლით, mobile burger
- Search (live), Categories dropdown, Language popover
- Cart/Favorites count badge-ები store-დან

### ნაბიჯი 4 — სექციები (ზემოდან ქვემოთ)
1. Hero
2. PopularCategories
3. FreshPicks (ფილტრი + ძებნა + show all + empty state)
4. DealsBanner + OfferCards
5. WeeklyBest (tabs)
6. MostSelling
7. ClosingCta

### ნაბიჯი 5 — Store + ინტერაქცია
- Cart store: add / change qty (0–99) / remove / coupon / persist
- Favorites store: toggle / persist
- UI store: activeCategory, query, showAll, openOverlay
- QuantityControl ყველგან სინქრონში (card, modal, drawer)

### ნაბიჯი 6 — Overlays
- CartDrawer (progress bar, summary, checkout preview)
- ContentModal + 10 შიგთავსი
- Toast

### ნაბიჯი 7 — Responsive + polish
- Breakpoints: 360 / 768 / 1024 / 1280
- Hover/focus states, keyboard (Esc ხურავს modal-ს), aria-label-ები
- `next/image` ყველა სურათზე, lazy loading hero-ს გარდა

### ნაბიჯი 8 — შემოწმება
- `npm run build` შეცდომების გარეშე
- Lighthouse: Performance ≥ 90, Accessibility ≥ 95
- პროტოტიპთან გვერდიგვერდ შედარება (desktop + mobile)

**ფაზა 1-ის შედეგი:** სტატიკური Next.js საიტი, სადაც ტექსტები/პროდუქტები/სურათები იცვლება მხოლოდ `src/data/` და `public/images/`-ში.

---

## 6. ფაზა 2 — Backend + Admin პანელი (მოკლე მონახაზი)

| რა | არჩევანი |
|---|---|
| ბაზა | PostgreSQL (prod) / SQLite (dev) + **Prisma** |
| Auth | **Auth.js** (credentials, admin როლი) |
| ადმინი | `src/app/(admin)/admin/*` — იგივე Next.js პროექტში |
| ფაილები | სურათების ატვირთვა (UploadThing / Vercel Blob / ლოკალური `uploads/`) |
| API | Server Actions + Route Handlers |

### ადმინის მოდულები
1. **Dashboard** — მოკლე სტატისტიკა
2. **Products** — CRUD, სურათი, ფასი/ძველი ფასი, ერთეული, კატეგორია, best-seller/weekly flag-ები, სორტი
3. **Categories** — CRUD, სურათი, tint ფერი, რიგითობა
4. **Offers / Banners** — 3 offer card + produce banner + hero + closing CTA ტექსტები და სურათები
5. **Site settings** — ბრენდი, tagline, nav ლინკები, footer, FAQ, Policy, Support ტექსტები, მიწოდების წესები (ფასი, უფასო ზღვარი, კუპონი)
6. **Orders** (სურვილისამებრ) — checkout-იდან შემოსული შეკვეთები, სტატუსები
7. **Users / Admins**

### მიგრაცია ფაზა 1 → ფაზა 2
- `src/lib/data.ts`-ში ფუნქციები (`getProducts()` …) სტატიკური ფაილის ნაცვლად Prisma-ს ეძახიან — **კომპონენტები არ იცვლება**
- მთავარი გვერდი ხდება dynamic / ISR (`revalidate`) + `revalidateTag` ადმინიდან შენახვისას
- `src/data/*` რჩება seed-ად (`prisma/seed.ts`)

---

## 7. ღია საკითხები (შენ გადაწყვეტ, სანამ ფაზა 2 დაიწყება)
- ვალუტა: `$` პროტოტიპში → `₾`?
- ენები: მხოლოდ ქართული, თუ KA + EN (i18n `next-intl`)?
- Checkout რეალური გახდეს თუ დარჩეს preview?
- ჰოსტინგი: Vercel თუ საკუთარი სერვერი?
