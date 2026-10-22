"use client";

import { useMemo } from "react";
import { site } from "@/data/site";
import { useCatalog } from "@/components/providers/CatalogProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PillLink } from "@/components/ui/PillButton";
import { ProductGrid } from "@/components/product/ProductGrid";

export function MostSelling() {
  const { products } = useCatalog();
  const list = useMemo(
    () => products.filter((p) => p.bestSellerRank).sort((a, b) => (a.bestSellerRank ?? 0) - (b.bestSellerRank ?? 0)),
    [products],
  );

  return (
    <section className="bestsellers-section section-pad" aria-labelledby="bestsellers-title">
      <SectionHeading id="bestsellers-title" title={site.sections.bestSellers} action={<PillLink href="/catalog">{site.sections.showAll}</PillLink>} />
      <ProductGrid products={list} />
    </section>
  );
}
