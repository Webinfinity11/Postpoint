"use client";

import { Minus, Plus } from "lucide-react";
import type { Product } from "@/types";
import { useCart } from "@/store/cart";
import { useShopActions } from "@/components/providers/CatalogProvider";
import { site } from "@/data/site";
import { fill } from "@/lib/money";

/** "Add to Cart" button that turns into a − qty + control once the product is in the bag */
export function QuantityControl({ product, className = "" }: { product: Product; className?: string }) {
  const qty = useCart((s) => s.items[product.id] ?? 0);
  const change = useCart((s) => s.change);
  const { addToCart } = useShopActions();

  if (!qty) {
    return (
      <button type="button" className={`add-to-cart ${className}`} onClick={() => addToCart(product.id)} aria-label={fill(site.product.addLabel, { name: product.name })}>
        <Plus className="icon" strokeWidth={1.65} aria-hidden="true" /> {site.product.addToCart}
      </button>
    );
  }

  return (
    <div className={`quantity-control ${className}`} aria-label={fill(site.product.quantity, { name: product.name })}>
      <button type="button" onClick={() => change(product.id, -1)} aria-label={fill(site.product.removeOne, { name: product.name })}>
        <Minus className="icon" strokeWidth={1.65} aria-hidden="true" />
      </button>
      <span aria-live="polite">{qty}</span>
      <button type="button" onClick={() => change(product.id, 1)} aria-label={fill(site.product.addOne, { name: product.name })} disabled={qty >= site.cart.maxQuantity}>
        <Plus className="icon" strokeWidth={1.65} aria-hidden="true" />
      </button>
    </div>
  );
}
