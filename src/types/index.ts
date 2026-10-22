export type Unit = "pc" | "set" | "roll" | "pack";

/** Icon shown when a category/product has no image yet */
export type CategoryIconName = "monitor" | "scan" | "cart" | "tags" | "warehouse" | "cctv";

export type Category = {
  id: string;
  name: string;
  /** Short text shown when the category is selected */
  description: string;
  caption: string;
  note?: string;
  /** Path inside /public, e.g. /images/category-pos.webp. Empty = show the icon */
  image: string;
  icon: CategoryIconName;
  /** Card background tint */
  tint: string;
};

export type Product = {
  id: string;
  name: string;
  categoryId: string;
  /** Path inside /public. Empty = show the category icon */
  image: string;
  price: number;
  oldPrice?: number;
  unit: Unit;
  description: string;
  source: string;
  isDemo?: boolean;
  specs?: { label: string; value: string }[];
  /** Shown first in the "Weekly Best Selling" tab of its category */
  isWeeklyPick?: boolean;
  /** Position in "Most Selling Products" (1 = first). Empty = not shown */
  bestSellerRank?: number;
};

export type OfferTheme = "green" | "gray" | "light";

export type Offer = {
  id: string;
  theme: OfferTheme;
  /** Each item is one line of the card title */
  title: string[];
  text: string;
  image: string;
  imageAlt: string;
  modal: {
    eyebrow: string;
    /** Each item is one line of the modal title */
    title: string[];
    text: string;
    button: string;
    caption: string;
    /** Show the coupon box inside the modal */
    showCoupon?: boolean;
  };
};

export type FaqItem = { question: string; answer: string };

export type Catalog = {
  categories: Category[];
  products: Product[];
  offers: Offer[];
};
