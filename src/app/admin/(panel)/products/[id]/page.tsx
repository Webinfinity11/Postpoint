import { notFound } from "next/navigation";
import { hasDatabase } from "@/lib/db";
import { adminCategories, adminProducts } from "../../../data";
import { ProductForm } from "../../../_components/ProductForm";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [categories, products] = await Promise.all([adminCategories(), adminProducts()]);
  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  return (
    <>
      <header className="adm-head">
        <h1>{product.name}</h1>
      </header>
      <ProductForm product={product} categories={categories} readOnly={!hasDatabase} />
    </>
  );
}
