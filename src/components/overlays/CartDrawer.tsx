"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag, X } from "lucide-react";
import { site } from "@/data/site";
import { useCatalog } from "@/components/providers/CatalogProvider";
import { useCart } from "@/store/cart";
import { useUi } from "@/store/ui";
import { useGoToCatalog } from "@/lib/navigation";
import { computeTotals } from "@/lib/cart";
import { fill, formatMoney } from "@/lib/money";
import { QuantityControl } from "@/components/product/QuantityControl";
import { ProductImage } from "@/components/product/ProductImage";
import { Dialog } from "./Dialog";

const ic = { className: "icon", strokeWidth: 1.65, "aria-hidden": true } as const;

export function CartDrawer() {
  const open = useUi((s) => s.cartOpen);
  const closeCart = useUi((s) => s.closeCart);
  const openModal = useUi((s) => s.openModal);
  const { productById } = useCatalog();
  const items = useCart((s) => s.items);
  const couponApplied = useCart((s) => s.couponApplied);
  const remove = useCart((s) => s.remove);
  const goToCatalog = useGoToCatalog();

  const t = site.cartDrawer;
  const totals = computeTotals(items, productById, couponApplied);
  const rows = Object.entries(items).filter(([id]) => productById[id]);

  return (
    <Dialog open={open} onClose={closeCart} className="cart-drawer" labelledBy="cart-title">
      <div className="drawer-header">
        <div>
          <span className="eyebrow">{t.eyebrow}</span>
          <h2 id="cart-title">
            {t.title} {totals.count > 0 && <span>({totals.count})</span>}
          </h2>
        </div>
        <button type="button" className="icon-button" onClick={closeCart} aria-label={t.close}>
          <X {...ic} />
        </button>
      </div>

      <div className="cart-content">
        {rows.length === 0 ? (
          <div className="cart-empty">
            <ShoppingBag {...ic} />
            <h3>{t.emptyTitle}</h3>
            <p>{t.emptyText}</p>
            <button type="button" className="solid-button" onClick={goToCatalog}>
              {t.emptyButton} <ArrowRight {...ic} />
            </button>
          </div>
        ) : (
          rows.map(([id, qty]) => {
            const p = productById[id];
            return (
              <div className="cart-item" key={id}>
                <ProductImage product={p} width={80} height={85} className="cart-item-image" />
                <div>
                  <h3>
                    <Link href={`/product/${p.id}`}>{p.name}</Link>
                  </h3>
                  <p>
                    {formatMoney(p.price)} / {site.units[p.unit]} · <strong>{formatMoney(p.price * qty)}</strong>
                  </p>
                  <div className="row">
                    <QuantityControl product={p} />
                    <button type="button" className="remove-item" onClick={() => remove(id)} aria-label={fill(t.removeLabel, { name: p.name })}>
                      {t.remove}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {rows.length > 0 && (
        <div className="cart-summary">
          <p className="delivery-note">{totals.delivery === 0 ? t.freeDelivery : fill(t.awayFromFree, { amount: formatMoney(totals.remaining) })}</p>
          <div className="delivery-progress">
            <span style={{ width: `${totals.progress}%` }} />
          </div>
          <div className="summary-row">
            <span>{t.subtotal}</span>
            <strong>{formatMoney(totals.subtotal)}</strong>
          </div>
          {couponApplied && (
            <div className="summary-row">
              <span>{fill(t.discount, { code: site.cart.coupon.code, percent: site.cart.coupon.percent })}</span>
              <strong>−{formatMoney(totals.discount)}</strong>
            </div>
          )}
          <div className="summary-row">
            <span>{t.delivery}</span>
            <strong>{totals.delivery ? formatMoney(totals.delivery) : t.free}</strong>
          </div>
          <div className="summary-row summary-total">
            <span>{t.total}</span>
            <strong>{formatMoney(totals.total)}</strong>
          </div>
          <button type="button" className="solid-button checkout-button" onClick={() => openModal({ type: "checkout" })}>
            {t.checkout} <ArrowRight {...ic} />
          </button>
          <p className="prototype-note">{t.note}</p>
        </div>
      )}
    </Dialog>
  );
}
