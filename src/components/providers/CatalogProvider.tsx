"use client";

import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import type { Catalog, Category, Product } from "@/types";
import { useCart } from "@/store/cart";
import { useFavorites } from "@/store/favorites";
import { useUi } from "@/store/ui";
import { site } from "@/data/site";
import { fill } from "@/lib/money";

type CatalogContext = Catalog & {
  productById: Record<string, Product>;
  categoryById: Record<string, Category>;
  /** Number of products in each category */
  categoryCounts: Record<string, number>;
};

const Ctx = createContext<CatalogContext | null>(null);

export function CatalogProvider({ catalog, children }: { catalog: Catalog; children: ReactNode }) {
  const value = useMemo(
    () => ({
      ...catalog,
      productById: Object.fromEntries(catalog.products.map((p) => [p.id, p])),
      categoryById: Object.fromEntries(catalog.categories.map((c) => [c.id, c])),
      categoryCounts: catalog.products.reduce<Record<string, number>>((acc, p) => ({ ...acc, [p.categoryId]: (acc[p.categoryId] ?? 0) + 1 }), {}),
    }),
    [catalog],
  );

  // Load cart + favourites from localStorage after the first render (avoids hydration mismatch)
  // and drop saved items whose product no longer exists in the catalog.
  useEffect(() => {
    const known = new Set(catalog.products.map((p) => p.id));
    Promise.all([useCart.persist.rehydrate(), useFavorites.persist.rehydrate()]).then(() => {
      const { items } = useCart.getState();
      const kept = Object.fromEntries(Object.entries(items).filter(([id]) => known.has(id)));
      if (Object.keys(kept).length !== Object.keys(items).length) useCart.setState({ items: kept });
      const ids = useFavorites.getState().ids;
      if (ids.some((id) => !known.has(id))) useFavorites.setState({ ids: ids.filter((id) => known.has(id)) });
    });
  }, [catalog.products]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCatalog() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCatalog must be used inside CatalogProvider");
  return ctx;
}

/** Cart / favourite actions that also show a toast */
export function useShopActions() {
  const { productById } = useCatalog();
  const add = useCart((s) => s.add);
  const toggle = useFavorites((s) => s.toggle);
  const showToast = useUi((s) => s.showToast);

  return {
    addToCart(id: string) {
      const product = productById[id];
      if (!product) return;
      add(id);
      showToast(fill(site.toasts.added, { name: product.name }));
    },
    toggleFavorite(id: string) {
      const saved = toggle(id);
      showToast(saved ? site.toasts.saved : site.toasts.removed);
    },
  };
}
