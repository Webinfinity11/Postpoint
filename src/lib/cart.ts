import { site } from "@/data/site";
import type { Product } from "@/types";

export type CartItems = Record<string, number>;

export function computeTotals(items: CartItems, byId: Record<string, Product>, couponApplied: boolean) {
  const { deliveryFee, freeDeliveryThreshold, coupon } = site.cart;
  let count = 0;
  let subtotal = 0;
  for (const [id, qty] of Object.entries(items)) {
    const product = byId[id];
    if (!product) continue;
    count += qty;
    subtotal += product.price * qty;
  }
  const delivery = subtotal >= freeDeliveryThreshold ? 0 : deliveryFee;
  const discount = couponApplied ? (subtotal * coupon.percent) / 100 : 0;
  const total = subtotal + delivery - discount;
  const progress = Math.min((subtotal / freeDeliveryThreshold) * 100, 100);
  const remaining = Math.max(freeDeliveryThreshold - subtotal, 0);
  return { count, subtotal, delivery, discount, total, progress, remaining };
}
