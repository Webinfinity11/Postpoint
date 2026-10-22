"use client";

import { ArrowRight, Check } from "lucide-react";
import { site } from "@/data/site";
import { useCatalog } from "@/components/providers/CatalogProvider";
import { useCart } from "@/store/cart";
import { useUi, type AuthMode } from "@/store/ui";
import { useGoToCatalog } from "@/lib/navigation";
import { computeTotals } from "@/lib/cart";
import { fill, formatMoney } from "@/lib/money";

const ic = { className: "icon", strokeWidth: 1.65, "aria-hidden": true } as const;

export function AuthModal({ mode }: { mode: AuthMode }) {
  const openModal = useUi((s) => s.openModal);
  const t = site.modals.auth;

  return (
    <>
      <span className="eyebrow">{t.eyebrow}</span>
      <h2 id="modal-title">{mode === "login" ? t.loginTitle : t.signupTitle}</h2>
      <div className="auth-tabs">
        <button type="button" className={mode === "login" ? "active" : ""} onClick={() => openModal({ type: "auth", mode: "login" })}>
          {t.loginTab}
        </button>
        <button type="button" className={mode === "signup" ? "active" : ""} onClick={() => openModal({ type: "auth", mode: "signup" })}>
          {t.signupTab}
        </button>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          openModal({ type: "auth-success", mode });
        }}
      >
        {mode === "signup" && (
          <label className="form-field">
            <span>{t.name}</span>
            <input name="name" autoComplete="given-name" placeholder={t.namePlaceholder} required maxLength={60} />
          </label>
        )}
        <label className="form-field">
          <span>{t.email}</span>
          <input name="email" type="email" placeholder={t.emailPlaceholder} autoComplete="email" required />
        </label>
        <div className="form-actions">
          <button className="solid-button" type="submit">
            {mode === "login" ? t.loginButton : t.signupButton} <ArrowRight {...ic} />
          </button>
        </div>
        <p className="form-caption">{t.caption}</p>
      </form>
    </>
  );
}

export function CheckoutModal() {
  const { productById } = useCatalog();
  const items = useCart((s) => s.items);
  const couponApplied = useCart((s) => s.couponApplied);
  const openModal = useUi((s) => s.openModal);
  const totals = computeTotals(items, productById, couponApplied);
  const t = site.modals.checkout;

  return (
    <>
      <span className="eyebrow">{t.eyebrow}</span>
      <h2 id="modal-title">{t.title}</h2>
      <p>
        {fill(t.summary, { count: totals.count })} · <strong>{formatMoney(totals.total)}</strong>
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          openModal({ type: "order-success", count: totals.count, total: totals.total });
        }}
      >
        <label className="form-field">
          <span>{t.name}</span>
          <input name="name" autoComplete="name" placeholder={t.namePlaceholder} maxLength={80} required />
        </label>
        <label className="form-field">
          <span>{t.address}</span>
          <input name="address" autoComplete="street-address" placeholder={t.addressPlaceholder} maxLength={180} required />
        </label>
        <label className="form-field">
          <span>{t.time}</span>
          <select name="delivery">
            {t.slots.map((slot) => (
              <option key={slot}>{slot}</option>
            ))}
          </select>
        </label>
        <div className="form-actions">
          <button className="solid-button" type="submit" disabled={totals.count === 0}>
            {t.button} <ArrowRight {...ic} />
          </button>
        </div>
        <p className="form-caption">{t.caption}</p>
      </form>
    </>
  );
}

export function AuthSuccessModal({ mode }: { mode: AuthMode }) {
  const t = site.modals.auth;
  const goToCatalog = useGoToCatalog();
  return (
    <div className="success-content">
      <div className="success-mark">
        <Check {...ic} />
      </div>
      <h2 id="modal-title">{mode === "login" ? t.successLogin : t.successSignup}</h2>
      <p>{t.successText}</p>
      <button type="button" className="solid-button" onClick={goToCatalog}>
        {t.successButton} <ArrowRight {...ic} />
      </button>
    </div>
  );
}

export function OrderSuccessModal({ count, total }: { count: number; total: number }) {
  const t = site.modals.success;
  const goToCatalog = useGoToCatalog();
  return (
    <div className="success-content">
      <div className="success-mark">
        <Check {...ic} />
      </div>
      <span className="eyebrow">{t.eyebrow}</span>
      <h2 id="modal-title">{t.title}</h2>
      <p>{fill(t.summary, { count, total: formatMoney(total) })}</p>
      <p>{t.text}</p>
      <button type="button" className="solid-button" onClick={goToCatalog}>
        {t.button} <ArrowRight {...ic} />
      </button>
    </div>
  );
}
