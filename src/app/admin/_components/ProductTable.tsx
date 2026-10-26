"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Category, Product } from "@/types";
import { formatMoney } from "@/lib/money";
import { deleteProduct } from "../actions";
import { DeleteButton } from "./DeleteButton";
import { Thumb } from "./Thumb";

export function ProductTable({ products, categories, initialFilter }: { products: Product[]; categories: Category[]; initialFilter: string }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialFilter);
  const categoryName = useMemo(() => Object.fromEntries(categories.map((c) => [c.id, c.name])), [categories]);

  const q = query.trim().toLowerCase();
  const rows = products.filter(
    (p) =>
      (!category || (category === "noimage" ? !p.image : p.categoryId === category)) &&
      (!q || p.name.toLowerCase().includes(q) || p.id.includes(q)),
  );

  return (
    <section className="adm-card adm-card-flush">
      <div className="adm-toolbar">
        <input type="search" placeholder="ძებნა სახელით ან ID-ით…" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="ძებნა" />
        <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="კატეგორია">
          <option value="">ყველა კატეგორია</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
          <option value="noimage">— სურათის გარეშე</option>
        </select>
      </div>
      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th aria-label="სურათი" />
              <th>სახელი</th>
              <th>კატეგორია</th>
              <th className="num">ფასი</th>
              <th>ნიშნები</th>
              <th aria-label="მოქმედებები" />
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id}>
                <td><Thumb src={p.image} alt={p.name} /></td>
                <td>
                  <Link className="adm-strong" href={`/admin/products/${p.id}`}>{p.name}</Link>
                  <div className="adm-muted adm-mono">{p.id}</div>
                </td>
                <td>{categoryName[p.categoryId] ?? p.categoryId}</td>
                <td className="num">
                  {formatMoney(p.price)}
                  {p.oldPrice ? <div className="adm-muted adm-strike">{formatMoney(p.oldPrice)}</div> : null}
                </td>
                <td className="adm-badges">
                  {p.isWeeklyPick && <span className="adm-badge">Weekly</span>}
                  {p.bestSellerRank && <span className="adm-badge">Top #{p.bestSellerRank}</span>}
                  {p.isDemo && <span className="adm-badge adm-badge-muted">დემო</span>}
                </td>
                <td className="adm-row-actions">
                  <Link className="adm-btn adm-btn-sm" href={`/admin/products/${p.id}`}>რედაქტირება</Link>
                  <DeleteButton action={deleteProduct.bind(null, p.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <p className="adm-empty">პროდუქტი ვერ მოიძებნა.</p>}
      </div>
    </section>
  );
}
