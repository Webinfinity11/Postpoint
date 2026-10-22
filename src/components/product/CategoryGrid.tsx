"use client";

import { useCatalog } from "@/components/providers/CatalogProvider";
import { CategoryCard } from "@/components/product/CategoryCard";

export function CategoryGrid({ className = "" }: { className?: string }) {
  const { categories, categoryCounts } = useCatalog();

  return (
    <div className={`category-grid ${className}`}>
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} count={categoryCounts[category.id] ?? 0} />
      ))}
    </div>
  );
}
