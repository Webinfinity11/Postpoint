"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { site } from "@/data/site";
import { faq, policy } from "@/data/faq";
import type { FaqItem } from "@/types";
import { useCatalog } from "@/components/providers/CatalogProvider";
import { useCart } from "@/store/cart";
import { useUi } from "@/store/ui";
import { useGoToCatalog } from "@/lib/navigation";
import { fill } from "@/lib/money";
import { Lines } from "@/components/ui/Lines";

const ic = { className: "icon", strokeWidth: 1.65, "aria-hidden": true } as const;

function Accordion({ items }: { items: FaqItem[] }) {
  return items.map((item, i) => (
    <details className="faq-item" key={item.question} open={i === 0}>
      <summary>{item.question}</summary>
      <p>{item.answer}</p>
    </details>
  ));
}

export function PolicyModal() {
  const t = site.modals.policy;
  return (
    <>
      <span className="eyebrow">{t.eyebrow}</span>
      <h2 id="modal-title">{t.title}</h2>
      <p>{t.intro}</p>
      <Accordion items={policy} />
    </>
  );
}

export function FaqModal() {
  const t = site.modals.faq;
  return (
    <>
      <span className="eyebrow">{t.eyebrow}</span>
      <h2 id="modal-title">{t.title}</h2>
      <Accordion items={faq} />
    </>
  );
}

export function SupportModal() {
  const t = site.modals.support;
  const openModal = useUi((s) => s.openModal);
  return (
    <>
      <span className="eyebrow">{t.eyebrow}</span>
      <h2 id="modal-title">{t.title}</h2>
      <p>{t.text}</p>
      <div className="form-actions">
        <button type="button" className="solid-button" onClick={() => openModal({ type: "faq" })}>
          {t.button} <ArrowRight {...ic} />
        </button>
      </div>
      <p className="form-caption">{t.caption}</p>
    </>
  );
}

export function OfferModal({ id }: { id: string }) {
  const { offers } = useCatalog();
  const couponApplied = useCart((s) => s.couponApplied);
  const applyCoupon = useCart((s) => s.applyCoupon);
  const showToast = useUi((s) => s.showToast);
  const [justApplied, setJustApplied] = useState(false);
  const goToCatalog = useGoToCatalog();
  const offer = offers.find((o) => o.id === id);
  if (!offer) return null;
  const m = offer.modal;
  const { coupon } = site.cart;

  return (
    <>
      <span className="eyebrow">{m.eyebrow}</span>
      <h2 id="modal-title">
        <Lines lines={m.title} />
      </h2>
      <p>{m.text}</p>
      {m.showCoupon && (
        <div className="coupon">
          <strong>{coupon.code}</strong>
          <button
            type="button"
            disabled={couponApplied && !justApplied}
            onClick={() => {
              applyCoupon();
              setJustApplied(true);
              showToast(fill(site.toasts.coupon, { code: coupon.code }));
            }}
          >
            {couponApplied ? site.modals.coupon.applied : site.modals.coupon.apply}
          </button>
        </div>
      )}
      <button type="button" className="solid-button" onClick={goToCatalog}>
        {m.button} <ArrowRight {...ic} />
      </button>
      <p className="form-caption">{m.caption}</p>
    </>
  );
}
