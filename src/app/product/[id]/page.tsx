import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/data";
import { ProductView } from "@/components/pages/ProductView";

type Props = { params: Promise<{ id: string }> };

// ყველა პროდუქტის გვერდი build-ის დროს მზადდება; უცნობი მისამართი → 404
export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct((await params).id);
  return product ? { title: product.name, description: product.description } : {};
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct((await params).id);
  if (!product) notFound();
  return <ProductView id={product.id} />;
}
