"use client";

import { useMemo, useRef, type KeyboardEvent } from "react";
import { site } from "@/data/site";
import { useCatalog } from "@/components/providers/CatalogProvider";
import { useUi } from "@/store/ui";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PillLink } from "@/components/ui/PillButton";
import { ProductGrid } from "@/components/product/ProductGrid";
import { fill } from "@/lib/money";

export function WeeklyBest() {
  const { categories, products, categoryById } = useCatalog();
  const weekly = useUi((s) => s.weeklyCategory);
  const setWeekly = useUi((s) => s.setWeeklyCategory);
  const tabsRef = useRef<HTMLDivElement>(null);

  const category = categoryById[weekly];
  const list = useMemo(() => products.filter((p) => p.categoryId === weekly), [products, weekly]);

  const select = (id: string, focus = false) => {
    setWeekly(id);
    requestAnimationFrame(() => {
      const button = tabsRef.current?.querySelector<HTMLButtonElement>(`[data-id="${id}"]`);
      if (focus) button?.focus({ preventScroll: true });
      button?.scrollIntoView({ block: "nearest", inline: "nearest" });
    });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.altKey || e.ctrlKey || e.metaKey || !categories.length || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    let i = categories.findIndex((c) => c.id === weekly);
    if (e.key === "Home") i = 0;
    else if (e.key === "End") i = categories.length - 1;
    else i = (i + (e.key === "ArrowRight" ? 1 : -1) + categories.length) % categories.length;
    select(categories[i].id, true);
  };

  return (
    <section className="weekly-section section-pad" id="weekly" aria-labelledby="weekly-title">
      <SectionHeading id="weekly-title" title={site.sections.weekly} action={<PillLink href={`/catalog/${weekly}`}>{site.sections.viewCategory}</PillLink>}>
        <p className="results-description">{site.sections.weeklyDescription}</p>
      </SectionHeading>
      <div className="category-tabs" role="tablist" aria-label={site.sections.weeklyTabs} ref={tabsRef} onKeyDown={onKeyDown}>
        {categories.map((c) => (
          <button
            type="button"
            key={c.id}
            id={`category-tab-${c.id}`}
            data-id={c.id}
            role="tab"
            aria-selected={weekly === c.id}
            aria-controls="weekly-grid"
            tabIndex={weekly === c.id ? 0 : -1}
            onClick={() => select(c.id)}
          >
            {c.name}
          </button>
        ))}
      </div>
      <p className="category-tab-summary" role="status" aria-live="polite" aria-atomic="true">
        <span>{category?.caption}</span>
        <span>{fill(site.sections.resultsCount, { count: list.length })}</span>
      </p>
      <div id="weekly-grid" role="tabpanel" aria-labelledby={`category-tab-${weekly}`} tabIndex={0}>
        {list.length ? <ProductGrid products={list} /> : <p className="empty-results">{site.catalogPage.empty}</p>}
      </div>
    </section>
  );
}
