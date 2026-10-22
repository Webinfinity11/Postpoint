"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { site } from "@/data/site";
import type { CartItems } from "@/lib/cart";

type CartState = {
  items: CartItems;
  couponApplied: boolean;
  add: (id: string) => void;
  change: (id: string, delta: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  applyCoupon: () => void;
};

const clamp = (n: number) => Math.max(0, Math.min(site.cart.maxQuantity, n));

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: {},
      couponApplied: false,
      add: (id) => set((s) => ({ items: { ...s.items, [id]: clamp((s.items[id] ?? 0) + 1) } })),
      change: (id, delta) =>
        set((s) => {
          const next = clamp((s.items[id] ?? 0) + delta);
          const items = { ...s.items };
          if (next) items[id] = next;
          else delete items[id];
          return { items };
        }),
      remove: (id) =>
        set((s) => {
          const items = { ...s.items };
          delete items[id];
          return { items };
        }),
      clear: () => set({ items: {}, couponApplied: false }),
      applyCoupon: () => set({ couponApplied: true }),
    }),
    {
      name: "rsline-cart-v1",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (s) => ({ items: s.items, couponApplied: s.couponApplied }),
    },
  ),
);
