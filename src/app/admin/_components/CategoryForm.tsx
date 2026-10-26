"use client";

import Link from "next/link";
import { useState } from "react";
import type { Category } from "@/types";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { deleteCategory, saveCategory } from "../actions";
import { ICONS } from "../constants";
import { ImageField } from "./ImageField";
import { NameAndId, SubmitButton, useSaveForm } from "./FormBits";
import { DeleteButton } from "./DeleteButton";

const empty: Category = { id: "", name: "", description: "", caption: "", image: "", icon: "monitor", tint: "#F0F3F8" };

export function CategoryForm({ category, productCount, readOnly }: { category?: Category; productCount: number; readOnly: boolean }) {
  const isNew = !category;
  const c = category ?? empty;
  const { state, pending, onSubmit } = useSaveForm(saveCategory);
  const [icon, setIcon] = useState(c.icon);
  const [tint, setTint] = useState(c.tint);

  return (
    <form onSubmit={onSubmit} className="adm-form adm-form-grid">
      <input type="hidden" name="isNew" value={isNew ? "1" : "0"} />

      <section className="adm-card">
        <h2>ძირითადი</h2>
        <NameAndId name={c.name} id={c.id} isNew={isNew} prefix="/catalog/" />
        <label className="adm-field">
          <span>ქვესათაური</span>
          <input name="caption" defaultValue={c.caption} placeholder="მაგ. POS სისტემები და პერიფერია" />
        </label>
        <label className="adm-field">
          <span>აღწერა</span>
          <textarea name="description" rows={3} defaultValue={c.description} />
        </label>
        <label className="adm-field">
          <span>შენიშვნა</span>
          <textarea name="note" rows={2} defaultValue={c.note ?? ""} placeholder="კატეგორიის გვერდზე ჩანს (არასავალდებულო)" />
        </label>
      </section>

      <section className="adm-card">
        <h2>სურათი და იერსახე</h2>
        <ImageField current={c.image} label="კატეგორიის სურათი" />
        <div className="adm-row">
          <label className="adm-field">
            <span>ხატულა (როცა სურათი არ არის)</span>
            <select name="icon" value={icon} onChange={(e) => setIcon(e.target.value as Category["icon"])}>
              {ICONS.map((i) => (
                <option key={i.value} value={i.value}>{i.label}</option>
              ))}
            </select>
          </label>
          <label className="adm-field">
            <span>ფონის ფერი</span>
            <span className="adm-color">
              <input type="color" name="tint" value={tint} onChange={(e) => setTint(e.target.value)} />
              <code>{tint}</code>
            </span>
          </label>
        </div>
        <div className="adm-icon-preview" style={{ background: tint }}>
          <CategoryIcon name={icon} />
        </div>
        <label className="adm-field">
          <span>რიგითობა</span>
          <input name="sortOrder" type="number" step="1" defaultValue={c.sortOrder ?? 0} />
          <small className="adm-muted">ნაკლები რიცხვი = უფრო წინ მენიუში და კარუსელში</small>
        </label>
      </section>

      <footer className="adm-form-foot">
        {state.error && <p className="adm-alert" role="alert">{state.error}</p>}
        <div className="adm-form-actions">
          {!isNew &&
            (productCount ? (
              <span className="adm-muted">წასაშლელად ჯერ გადაიტანე ან წაშალე {productCount} პროდუქტი</span>
            ) : (
              <DeleteButton action={deleteCategory.bind(null, c.id)} redirectTo="/admin/categories" />
            ))}
          <span className="adm-spacer" />
          {!isNew && <a className="adm-btn" href={`/catalog/${c.id}`} target="_blank" rel="noreferrer">საიტზე ნახვა ↗</a>}
          <Link className="adm-btn" href="/admin/categories">გაუქმება</Link>
          <SubmitButton pending={pending} disabled={readOnly} />
        </div>
      </footer>
    </form>
  );
}
