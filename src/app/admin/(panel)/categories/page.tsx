import Link from "next/link";
import { deleteCategory } from "../../actions";
import { adminCategories, adminProducts } from "../../data";
import { DeleteButton } from "../../_components/DeleteButton";
import { SavedNotice } from "../../_components/SavedNotice";
import { Thumb } from "../../_components/Thumb";

type Props = { searchParams: Promise<{ saved?: string }> };

export default async function CategoriesPage({ searchParams }: Props) {
  const { saved } = await searchParams;
  const [categories, products] = await Promise.all([adminCategories(), adminProducts()]);
  const count = (id: string) => products.filter((p) => p.categoryId === id).length;

  return (
    <>
      <header className="adm-head">
        <h1>კატეგორიები <span className="adm-muted">({categories.length})</span></h1>
        <Link className="adm-btn adm-btn-primary" href="/admin/categories/new">+ ახალი კატეგორია</Link>
      </header>
      {saved && <SavedNotice />}
      <section className="adm-card adm-card-flush">
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th aria-label="სურათი" />
                <th>სახელი</th>
                <th className="num">პროდუქტი</th>
                <th className="num">რიგი</th>
                <th aria-label="მოქმედებები" />
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c.id}>
                  <td><Thumb src={c.image} alt={c.name} /></td>
                  <td>
                    <Link className="adm-strong" href={`/admin/categories/${c.id}`}>{c.name}</Link>
                    <div className="adm-muted">{c.caption}</div>
                  </td>
                  <td className="num">
                    <Link href={`/admin/products?category=${c.id}`}>{count(c.id)}</Link>
                  </td>
                  <td className="num">{c.sortOrder ?? 0}</td>
                  <td className="adm-row-actions">
                    <Link className="adm-btn adm-btn-sm" href={`/admin/categories/${c.id}`}>რედაქტირება</Link>
                    {count(c.id) === 0 && <DeleteButton action={deleteCategory.bind(null, c.id)} />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {categories.length === 0 && <p className="adm-empty">კატეგორია ჯერ არ არის.</p>}
        </div>
      </section>
    </>
  );
}
