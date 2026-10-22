"use client";

import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { useMemo } from "react";
import { site } from "@/data/site";
import { useCatalog } from "@/components/providers/CatalogProvider";
import { useUi } from "@/store/ui";
import { fill } from "@/lib/money";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CategoryGrid } from "@/components/product/CategoryGrid";
import { ProductGrid } from "@/components/product/ProductGrid";

const pad = (n: number) => String(n).padStart(2, "0");

/** /catalog (all products or search results) and /catalog/[category] */
export function CatalogView({ categoryId }: { categoryId?: string }) {
  const { categories, products, categoryById, categoryCounts } = useCatalog();
  const query = useUi((s) => s.query);
  const clearFilters = useUi((s) => s.clearFilters);
  const t = site.catalogPage;

  const category = categoryId ? categoryById[categoryId] : undefined;
  const index = category ? categories.indexOf(category) : -1;
  const q = category ? "" : query.trim().toLowerCase();

  const list = useMemo(() => {
    let result = category ? products.filter((p) => p.categoryId === category.id) : products;
    if (q) result = result.filter((p) => `${p.name} ${p.description} ${categoryById[p.categoryId]?.name ?? ""}`.toLowerCase().includes(q));
    return result;
  }, [products, category, q, categoryById]);

  const title = q ? site.sections.searchResults : category ? category.name : t.title;
  const lead = q ? fill(site.sections.resultsQuery, { count: list.length, query: query.trim() }) : category ? category.description : t.text;

  return (
    <div className="page section-pad">
      <Breadcrumbs items={category ? [{ label: t.title, href: "/catalog" }, { label: category.name }] : [{ label: t.title }]} />

      <div className="catalog-layout">
        <aside className="catalog-sidebar">
          <p className="sidebar-title">{t.sidebarTitle}</p>
          <ul>
            <li>
              <Link href="/catalog" className={!category ? "active" : ""} aria-current={!category ? "page" : undefined}>
                <span className="sidebar-num">00</span>
                <span className="sidebar-name">{t.all}</span>
                <span className="sidebar-count">{products.length}</span>
              </Link>
            </li>
            {categories.map((c, i) => (
              <li key={c.id}>
                <Link href={`/catalog/${c.id}`} className={c.id === category?.id ? "active" : ""} aria-current={c.id === category?.id ? "page" : undefined}>
                  <span className="sidebar-num">{pad(i + 1)}</span>
                  <span className="sidebar-name">{c.name}</span>
                  <span className="sidebar-count">{categoryCounts[c.id] ?? 0}</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        <section className="catalog-main" aria-labelledby="catalog-title">
          <header className={`page-head${category ? " catalog-category-head" : ""}`}>
            <div>
              <span className="page-eyebrow">{category ? `${pad(index + 1)} / ${t.eyebrow}` : t.eyebrow}</span>
              <div className="page-title-row">
                <h1 id="catalog-title">{title}</h1>
              </div>
              <p className="page-lead">{lead}</p>
              {q && (
                <div className="filter-summary">
                  <button type="button" onClick={clearFilters}>
                    {site.sections.clearFilters} <X className="icon" strokeWidth={1.65} aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
            {category && <Image className="catalog-category-photo" src={category.image} alt="" width={600} height={450} sizes="(max-width: 600px) 90vw, 240px" priority />}
          </header>

          {!category && !q && <CategoryGrid className="catalog-category-grid" />}
          {!category && !q && <h2 className="catalog-products-title">{t.all}</h2>}
          {list.some((product) => product.isDemo) && <p className="catalog-demo-note">{t.demoNotice}</p>}
          {!q && <p className="catalog-count">{fill(site.sections.resultsCount, { count: list.length })}</p>}

          {list.length ? (
            <ProductGrid products={list} className="catalog-products" />
          ) : (
            <div className="empty-results">
              <h3>{q ? site.empty.title : t.empty}</h3>
              {q && <p>{site.empty.text}</p>}
            </div>
          )}
          {category?.note && <p className="catalog-category-note">{category.note}</p>}
        </section>
      </div>
    </div>
  );
}
