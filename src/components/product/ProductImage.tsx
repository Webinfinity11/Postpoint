"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import type { Product } from "@/types";
import { useCatalog } from "@/components/providers/CatalogProvider";
import { CategoryIcon } from "@/components/ui/CategoryIcon";

/** Product photo, or the category icon on a tinted tile while there is no photo yet */
export function ProductImage({ product, width, height, className = "" }: { product: Product; width: number; height: number; className?: string }) {
  const { categoryById } = useCatalog();
  if (product.image) return <Image className={className} src={product.image} alt={product.name} width={width} height={height} />;

  const category = categoryById[product.categoryId];
  return (
    <span className={`image-placeholder ${className}`} style={{ "--tint": category?.tint ?? "var(--surface)" } as CSSProperties} role="img" aria-label={product.name}>
      <CategoryIcon name={category?.icon ?? "monitor"} />
    </span>
  );
}
