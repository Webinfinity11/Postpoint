"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import type { Product } from "@/types";
import { useFavorites } from "@/store/favorites";
import { useShopActions } from "@/components/providers/CatalogProvider";
import { QuantityControl } from "./QuantityControl";
import { ProductImage } from "./ProductImage";
import { fill, formatMoney } from "@/lib/money";
import { site } from "@/data/site";

export function ProductCard({ product }: { product: Product }) {
  const loved = useFavorites((s) => s.ids.includes(product.id));
  const { toggleFavorite } = useShopActions();
  const href = `/product/${product.id}`;

  return (
    <article className="product-card">
      <button
        type="button"
        className={`favorite-product ${loved ? "selected" : ""}`}
        onClick={() => toggleFavorite(product.id)}
        aria-pressed={loved}
        aria-label={fill(loved ? site.product.unsave : site.product.save, { name: product.name })}
      >
        <Heart className="icon" strokeWidth={1.65} aria-hidden="true" />
      </button>
      <Link href={href} className="product-picture" aria-label={fill(site.product.view, { name: product.name })}>
        <ProductImage product={product} width={160} height={130} />
      </Link>
      <h3>
        <Link href={href} className="product-name">
          {product.name}
        </Link>
      </h3>
      <p className="product-source">{product.source}</p>
      <p className="product-price">
        {formatMoney(product.price)}
        <span>
          / {site.units[product.unit]}
        </span>
      </p>
      <div className="product-control">
        <QuantityControl product={product} />
      </div>
    </article>
  );
}
