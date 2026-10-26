import { notFound } from "next/navigation";
import { hasDatabase } from "@/lib/db";
import { adminCategories, adminProducts } from "../../../data";
import { CategoryForm } from "../../../_components/CategoryForm";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [categories, products] = await Promise.all([adminCategories(), adminProducts()]);
  const category = categories.find((c) => c.id === id);
  if (!category) notFound();

  return (
    <>
      <header className="adm-head">
        <h1>{category.name}</h1>
      </header>
      <CategoryForm category={category} productCount={products.filter((p) => p.categoryId === id).length} readOnly={!hasDatabase} />
    </>
  );
}
