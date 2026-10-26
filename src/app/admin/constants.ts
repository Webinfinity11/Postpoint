import type { CategoryIconName, Unit } from "@/types";
import { site } from "@/data/site";

/** Largest file accepted for upload; it is compressed before saving */
export const MAX_IMAGE_MB = 10;
/** Saved images are resized to fit this many pixels on the long side */
export const IMAGE_MAX_SIDE = 1600;
/** WebP quality of saved images (0–100) */
export const IMAGE_QUALITY = 80;

export const UNITS = (Object.entries(site.units) as [Unit, string][]).map(([value, label]) => ({ value, label }));

export const ICONS: { value: CategoryIconName; label: string }[] = [
  { value: "monitor", label: "მონიტორი" },
  { value: "scan", label: "შტრიხკოდი" },
  { value: "cart", label: "ურიკა" },
  { value: "tags", label: "ეტიკეტები" },
  { value: "warehouse", label: "საწყობი" },
  { value: "cctv", label: "კამერა" },
];
