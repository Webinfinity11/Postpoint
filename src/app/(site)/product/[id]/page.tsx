import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/data";
import { ProductView } from "@/components/pages/ProductView";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct((await params).id);
  return product ? { title: product.name, description: product.description } : {};
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct((await params).id);
  if (!product) notFound();
  return <ProductView id={product.id} />;
}
