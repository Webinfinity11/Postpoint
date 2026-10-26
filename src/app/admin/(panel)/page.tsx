import Link from "next/link";
import { adminCategories, adminProducts } from "../data";

export default async function Dashboard() {
  const [categories, products] = await Promise.all([adminCategories(), adminProducts()]);
  const stats = [
    { label: "პროდუქტი", value: products.length, href: "/admin/products" },
    { label: "კატეგორია", value: categories.length, href: "/admin/categories" },
    { label: "ფასდაკლებით", value: products.filter((p) => p.oldPrice).length, href: "/admin/products" },
    { label: "სურათის გარეშე", value: products.filter((p) => !p.image).length, href: "/admin/products?filter=noimage" },
  ];

  return (
    <>
      <header className="adm-head">
        <h1>მიმოხილვა</h1>
        <div className="adm-head-actions">
          <Link className="adm-btn" href="/admin/categories/new">+ კატეგორია</Link>
          <Link className="adm-btn adm-btn-primary" href="/admin/products/new">+ პროდუქტი</Link>
        </div>
      </header>
      <div className="adm-stats">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="adm-card adm-stat">
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </Link>
        ))}
      </div>
      <section className="adm-card">
        <h2>კატეგორიები</h2>
        <ul className="adm-list">
          {categories.map((c) => (
            <li key={c.id}>
              <Link href={`/admin/categories/${c.id}`}>{c.name}</Link>
              <span className="adm-muted">{products.filter((p) => p.categoryId === c.id).length} პროდუქტი</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
