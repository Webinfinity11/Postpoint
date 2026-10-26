import Link from "next/link";
import { hasDatabase } from "@/lib/db";
import { adminCategories } from "../../../data";
import { ProductForm } from "../../../_components/ProductForm";

export default async function NewProductPage() {
  const categories = await adminCategories();
  return (
    <>
      <header className="adm-head">
        <h1>ახალი პროდუქტი</h1>
      </header>
      {categories.length ? (
        <ProductForm categories={categories} readOnly={!hasDatabase} />
      ) : (
        <p className="adm-alert">ჯერ <Link href="/admin/categories/new">დაამატე კატეგორია</Link>.</p>
      )}
    </>
  );
}
