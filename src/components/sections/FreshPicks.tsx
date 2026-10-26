"use client";

import { Search, X } from "lucide-react";
import { useMemo } from "react";
import { site } from "@/data/site";
import { useCatalog } from "@/components/providers/CatalogProvider";
import { useUi } from "@/store/ui";
import { fill } from "@/lib/money";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PillButton } from "@/components/ui/PillButton";
import { ProductGrid } from "@/components/product/ProductGrid";

export function FreshPicks() {
  const { products, categoryById } = useCatalog();
  const { activeCategory, query, showAll, toggleShowAll, clearFilters } = useUi();

  const list = useMemo(() => {
    const featured = products.filter((product) => site.sections.featuredProductIds.includes(product.id));
    let result = activeCategory === "all" && !query && !showAll ? featured.slice(0, site.sections.freshPicksLimit) : products;
    if (activeCategory !== "all") result = result.filter((p) => p.categoryId === activeCategory);
    if (query) {
      const q = query.toLowerCase();
      result = result.filter((p) => `${p.name} ${p.description} ${categoryById[p.categoryId]?.name ?? ""}`.toLowerCase().includes(q));
    }
    return result;
  }, [products, categoryById, activeCategory, query, showAll]);

  const filtered = Boolean(query) || activeCategory !== "all";
  const category = categoryById[activeCategory];
  const title = query ? site.sections.searchResults : category ? category.name : site.sections.freshPicks;

  return (
    <section className="fresh-section section-pad" id="fresh-picks" aria-labelledby="fresh-title">
      <SectionHeading
        id="fresh-title"
        eyebrow="02 / POSPOINT-ის არჩევანი"
        title={title}
        action={<PillButton onClick={toggleShowAll}>{showAll && !filtered ? site.sections.showLess : site.sections.showAll}</PillButton>}
      >
        {!filtered && <p className="results-description">{site.sections.featuredDescription}</p>}
        {filtered && (
          <p className="results-description">
            {query
              ? fill(site.sections.resultsQuery, { count: list.length, query })
              : `${category ? category.description + " · " : ""}${fill(site.sections.resultsCount, { count: list.length })}`}
          </p>
        )}
      </SectionHeading>

      {filtered && (
        <div className="filter-summary">
          <button type="button" onClick={clearFilters}>
            {site.sections.clearFilters} <X className="icon" strokeWidth={1.65} aria-hidden="true" />
          </button>
        </div>
      )}

      {list.length ? (
        <ProductGrid products={list} />
      ) : (
        <div className="empty-results">
          <Search className="icon" strokeWidth={1.65} aria-hidden="true" />
          <h3>{site.empty.title}</h3>
          <p>{site.empty.text}</p>
          <button type="button" className="solid-button" onClick={clearFilters}>
            {site.empty.button}
          </button>
        </div>
      )}
    </section>
  );
}
