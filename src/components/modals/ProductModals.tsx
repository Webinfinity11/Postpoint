"use client";

import Link from "next/link";
import { ArrowRight, Plus, X } from "lucide-react";
import { site } from "@/data/site";
import { useCatalog, useShopActions } from "@/components/providers/CatalogProvider";
import { useFavorites } from "@/store/favorites";
import { useGoToCatalog } from "@/lib/navigation";
import { fill, formatMoney } from "@/lib/money";
import { ProductImage } from "@/components/product/ProductImage";

const ic = { className: "icon", strokeWidth: 1.65, "aria-hidden": true } as const;

export function FavoritesModal() {
  const { productById } = useCatalog();
  const { addToCart } = useShopActions();
  const ids = useFavorites((s) => s.ids);
  const remove = useFavorites((s) => s.remove);
  const t = site.modals.favorites;
  const goToCatalog = useGoToCatalog();
  const list = ids.map((id) => productById[id]).filter(Boolean);

  return (
    <>
      <span className="eyebrow">{t.eyebrow}</span>
      <h2 id="modal-title">{t.title}</h2>
      {list.length ? (
        <div className="favorite-list">
          {list.map((p) => (
            <div className="favorite-row" key={p.id}>
              <ProductImage className="favorite-image" product={p} width={66} height={60} />
              <div>
                <h3>
                  <Link href={`/product/${p.id}`}>{p.name}</Link>
                </h3>
                <p>
                  {formatMoney(p.price)} / {site.units[p.unit]}
                </p>
              </div>
              <button type="button" className="solid-button" onClick={() => addToCart(p.id)}>
                {t.add} <Plus {...ic} />
              </button>
              <button type="button" className="icon-button" onClick={() => remove(p.id)} aria-label={fill(t.removeLabel, { name: p.name })}>
                <X {...ic} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <>
          <p>{t.empty}</p>
          <button type="button" className="solid-button" onClick={goToCatalog}>
            {t.emptyButton} <ArrowRight {...ic} />
          </button>
        </>
      )}
    </>
  );
}
