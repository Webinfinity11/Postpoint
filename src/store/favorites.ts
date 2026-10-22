"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type FavoritesState = {
  ids: string[];
  /** Returns true when the product is now saved */
  toggle: (id: string) => boolean;
  remove: (id: string) => void;
};

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) => {
        const saved = get().ids.includes(id);
        set({ ids: saved ? get().ids.filter((x) => x !== id) : [...get().ids, id] });
        return !saved;
      },
      remove: (id) => set((s) => ({ ids: s.ids.filter((x) => x !== id) })),
    }),
    {
      name: "rsline-favorites-v1",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    },
  ),
);
