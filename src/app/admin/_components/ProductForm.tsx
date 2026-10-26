"use client";

import Link from "next/link";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import type { Category, Product } from "@/types";
import { deleteProduct, saveProduct } from "../actions";
import { UNITS } from "../constants";
import { ImageField } from "./ImageField";
import { NameAndId, SubmitButton, useSaveForm } from "./FormBits";
import { DeleteButton } from "./DeleteButton";

const empty: Product = { id: "", name: "", categoryId: "", image: "", price: 0, unit: "pc", description: "", source: "Pospoint" };

export function ProductForm({ product, categories, readOnly }: { product?: Product; categories: Category[]; readOnly: boolean }) {
  const isNew = !product;
  const p = product ?? { ...empty, categoryId: categories[0]?.id ?? "" };
  const { state, pending, onSubmit } = useSaveForm(saveProduct);
  const [specs, setSpecs] = useState(() => (p.specs ?? []).map((s, i) => ({ ...s, key: i })));

  return (
    <form onSubmit={onSubmit} className="adm-form adm-form-grid">
      <input type="hidden" name="isNew" value={isNew ? "1" : "0"} />

      <section className="adm-card">
        <h2>ძირითადი</h2>
        <NameAndId name={p.name} id={p.id} isNew={isNew} prefix="/product/" />
        <label className="adm-field">
          <span>კატეგორია *</span>
          <select name="categoryId" defaultValue={p.categoryId} required>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </label>
        <label className="adm-field">
          <span>აღწერა</span>
          <textarea name="description" rows={5} defaultValue={p.description} />
        </label>
        <label className="adm-field">
          <span>წყარო / ბრენდი</span>
          <input name="source" defaultValue={p.source} />
        </label>
      </section>

      <section className="adm-card">
        <h2>ფასი</h2>
        <div className="adm-row">
          <label className="adm-field">
            <span>ფასი *</span>
            <input name="price" type="number" step="0.01" min="0" required defaultValue={p.price} />
          </label>
          <label className="adm-field">
            <span>ძველი ფასი</span>
            <input name="oldPrice" type="number" step="0.01" min="0" defaultValue={p.oldPrice ?? ""} placeholder="ფასდაკლებისთვის" />
          </label>
          <label className="adm-field">
            <span>ერთეული</span>
            <select name="unit" defaultValue={p.unit}>
              {UNITS.map((u) => (
                <option key={u.value} value={u.value}>{u.label}</option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="adm-card">
        <h2>სურათი</h2>
        <ImageField current={p.image} label="პროდუქტის ფოტო" />
      </section>

      <section className="adm-card">
        <h2>მახასიათებლები</h2>
        {specs.map((s, i) => (
          <div className="adm-spec" key={s.key}>
            <input name="specLabel" placeholder="დასახელება (მაგ. ზომა)" defaultValue={s.label} aria-label={`მახასიათებელი ${i + 1}`} />
            <input name="specValue" placeholder="მნიშვნელობა" defaultValue={s.value} aria-label={`მნიშვნელობა ${i + 1}`} />
            <button type="button" className="adm-icon-btn" onClick={() => setSpecs(specs.filter((x) => x.key !== s.key))} aria-label="წაშლა">
              <X className="icon" />
            </button>
          </div>
        ))}
        <button type="button" className="adm-btn adm-btn-sm" onClick={() => setSpecs([...specs, { label: "", value: "", key: Date.now() }])}>
          <Plus className="icon" /> დამატება
        </button>
      </section>

      <section className="adm-card">
        <h2>მთავარ გვერდზე</h2>
        <label className="adm-check">
          <input type="checkbox" name="isWeeklyPick" defaultChecked={p.isWeeklyPick} />
          <span>„კვირის საუკეთესო“ — პირველი თავის კატეგორიის ჩანართში</span>
        </label>
        <label className="adm-field">
          <span>„ყველაზე გაყიდვადი“ — პოზიცია</span>
          <input name="bestSellerRank" type="number" min="1" step="1" defaultValue={p.bestSellerRank ?? ""} placeholder="ცარიელი = არ ჩანს" />
        </label>
        <label className="adm-field">
          <span>რიგითობა სიაში</span>
          <input name="sortOrder" type="number" step="1" defaultValue={p.sortOrder ?? 0} />
          <small className="adm-muted">ნაკლები რიცხვი = უფრო წინ</small>
        </label>
        <label className="adm-check">
          <input type="checkbox" name="isDemo" defaultChecked={p.isDemo} />
          <span>დემო ფასი (საიტზე მოინიშნება როგორც სავარაუდო)</span>
        </label>
      </section>

      <footer className="adm-form-foot">
        {state.error && <p className="adm-alert" role="alert">{state.error}</p>}
        <div className="adm-form-actions">
          {!isNew && <DeleteButton action={deleteProduct.bind(null, p.id)} redirectTo="/admin/products" />}
          <span className="adm-spacer" />
          {!isNew && <a className="adm-btn" href={`/product/${p.id}`} target="_blank" rel="noreferrer">საიტზე ნახვა ↗</a>}
          <Link className="adm-btn" href="/admin/products">გაუქმება</Link>
          <SubmitButton pending={pending} disabled={readOnly} />
        </div>
      </footer>
    </form>
  );
}
