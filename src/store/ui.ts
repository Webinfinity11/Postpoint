"use client";

import { create } from "zustand";
import { site } from "@/data/site";

export type InfoModal = "policy" | "faq" | "support";
export type AuthMode = "login" | "signup";

export type Modal =
  | { type: "favorites" }
  | { type: "auth"; mode: AuthMode }
  | { type: InfoModal }
  | { type: "offer"; id: string }
  | { type: "checkout" }
  | { type: "auth-success"; mode: AuthMode }
  | { type: "order-success"; count: number; total: number };

type UiState = {
  activeCategory: string;
  query: string;
  showAll: boolean;
  weeklyCategory: string;
  cartOpen: boolean;
  modal: Modal | null;
  toast: { id: number; message: string } | null;

  applyFilter: (categoryId: string) => void;
  clearFilters: () => void;
  setQuery: (query: string) => void;
  toggleShowAll: () => void;
  setWeeklyCategory: (id: string) => void;
  openCart: () => void;
  openModal: (modal: Modal) => void;
  closeCart: () => void;
  closeModal: () => void;
  closeAll: () => void;
  showToast: (message: string) => void;
};

export const useUi = create<UiState>()((set, get) => ({
  activeCategory: "all",
  query: "",
  showAll: false,
  weeklyCategory: site.sections.weeklyDefaultCategory,
  cartOpen: false,
  modal: null,
  toast: null,

  applyFilter: (categoryId) => set({ activeCategory: categoryId, query: "", showAll: categoryId !== "all" }),
  clearFilters: () => set({ activeCategory: "all", query: "", showAll: false }),
  setQuery: (query) => set({ query, activeCategory: "all", showAll: true }),
  toggleShowAll: () => {
    const { activeCategory, query, showAll } = get();
    if (activeCategory !== "all" || query) set({ activeCategory: "all", query: "", showAll: true });
    else set({ showAll: !showAll });
  },
  setWeeklyCategory: (id) => set({ weeklyCategory: id }),
  openCart: () => set({ cartOpen: true, modal: null }),
  openModal: (modal) => set({ modal, cartOpen: false }),
  closeCart: () => set({ cartOpen: false }),
  closeModal: () => set({ modal: null }),
  closeAll: () => set({ modal: null, cartOpen: false }),
  showToast: (message) => set({ toast: { id: Date.now(), message } }),
}));

export function scrollToShop() {
  document.getElementById("fresh-picks")?.scrollIntoView({ behavior: "smooth", block: "start" });
}
