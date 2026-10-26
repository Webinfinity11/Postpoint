import Link from "next/link";
import { adminCategories, adminProducts } from "../../data";
import { ProductTable } from "../../_components/ProductTable";
import { SavedNotice } from "../../_components/SavedNotice";

type Props = { searchParams: Promise<{ saved?: string; filter?: string; category?: string }> };

export default async function ProductsPage({ searchParams }: Props) {
  const { saved, filter, category } = await searchParams;
  const [categories, products] = await Promise.all([adminCategories(), adminProducts()]);

  return (
    <>
      <header className="adm-head">
        <h1>პროდუქტები <span className="adm-muted">({products.length})</span></h1>
        <Link className="adm-btn adm-btn-primary" href="/admin/products/new">+ ახალი პროდუქტი</Link>
      </header>
      {saved && <SavedNotice />}
      <ProductTable products={products} categories={categories} initialFilter={filter === "noimage" ? "noimage" : (category ?? "")} />
    </>
  );
}
