import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import type { HTMLAttributes } from "react";

export function ProductGrid({ products, className = "", ...rest }: { products: Product[] } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`product-grid ${className}`} {...rest}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
