"use client";

import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { useMemo } from "react";
import { site } from "@/data/site";
import { useCatalog, useShopActions } from "@/components/providers/CatalogProvider";
import { useCart } from "@/store/cart";
import { useFavorites } from "@/store/favorites";
import { useUi } from "@/store/ui";
import { fill, formatMoney } from "@/lib/money";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PillLink } from "@/components/ui/PillButton";
import { ProductImage } from "@/components/product/ProductImage";
import { QuantityControl } from "@/components/product/QuantityControl";
import { ProductGrid } from "@/components/product/ProductGrid";

const ic = { className: "icon", strokeWidth: 1.65, "aria-hidden": true } as const;

export function ProductView({ id }: { id: string }) {
  const { productById, categoryById, products } = useCatalog();
  const { toggleFavorite } = useShopActions();
  const qty = useCart((s) => s.items[id] ?? 0);
  const loved = useFavorites((s) => s.ids.includes(id));
  const openCart = useUi((s) => s.openCart);
  const t = site.productPage;

  const product = productById[id];
  const related = useMemo(() => {
    if (!product) return [];
    const same = products.filter((p) => p.categoryId === product.categoryId && p.id !== product.id);
    const others = products.filter((p) => p.categoryId !== product.categoryId);
    return [...same, ...others].slice(0, 5);
  }, [products, product]);

  if (!product) return null;
  const category = categoryById[product.categoryId];
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;

  return (
    <div className="page section-pad">
      <Breadcrumbs
        items={[
          { label: site.catalogPage.title, href: "/catalog" },
          ...(category ? [{ label: category.name, href: `/catalog/${category.id}` }] : []),
          { label: product.name },
        ]}
      />

      <article className="product-page">
        <div className="product-gallery">
          {discount > 0 && <span className="discount-badge">{fill(t.discount, { percent: discount })}</span>}
          <ProductImage product={product} width={640} height={520} className="product-gallery-image" />
        </div>

        <div className="product-info">
          {category && (
            <Link href={`/catalog/${category.id}`} className="page-eyebrow">
              {category.name}
            </Link>
          )}
          <h1>{product.name}</h1>

          <div className="product-page-price">
            <strong>{formatMoney(product.price)}</strong>
            {product.oldPrice && <s>{formatMoney(product.oldPrice)}</s>}
            <span>/ {site.units[product.unit]}</span>
          </div>

          <p className="product-page-desc">{product.description}</p>
          {product.isDemo && <p className="product-demo-note">{site.product.demoCaption}</p>}

          <div className="product-actions">
            <QuantityControl product={product} className="large" />
            <button type="button" className={`favorite-toggle ${loved ? "selected" : ""}`} onClick={() => toggleFavorite(product.id)} aria-pressed={loved}>
              <Heart {...ic} /> {loved ? t.saved : t.save}
            </button>
          </div>
          {qty > 0 && (
            <button type="button" className="solid-button view-cart" onClick={openCart}>
              <ShoppingBag {...ic} /> {t.viewCart}
            </button>
          )}

          <dl className="product-specs">
            {category && (
              <div>
                <dt>{t.category}</dt>
                <dd>
                  <Link href={`/catalog/${category.id}`}>{category.name}</Link>
                </dd>
              </div>
            )}
            <div>
              <dt>{t.unit}</dt>
              <dd>{site.units[product.unit]}</dd>
            </div>
            <div>
              <dt>{t.brand}</dt>
              <dd>{product.source}</dd>
            </div>
            <div>
              <dt>{t.code}</dt>
              <dd>{product.id.toUpperCase()}</dd>
            </div>
            {product.specs?.map((spec) => (
              <div key={spec.label}>
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
          {category?.note && <p className="product-spec-note">{category.note}</p>}
        </div>
      </article>

      {related.length > 0 && (
        <section className="related-section" aria-labelledby="related-title">
          <SectionHeading
            id="related-title"
            title={t.related}
            action={<PillLink href={category ? `/catalog/${category.id}` : "/catalog"}>{site.sections.showAll}</PillLink>}
          />
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
