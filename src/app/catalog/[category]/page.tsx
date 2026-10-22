import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategories, getCategory } from "@/lib/data";
import { CatalogView } from "@/components/pages/CatalogView";

type Props = { params: Promise<{ category: string }> };

// ყველა კატეგორიის გვერდი build-ის დროს მზადდება; უცნობი მისამართი → 404
export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getCategories()).map((c) => ({ category: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await getCategory((await params).category);
  return category ? { title: category.name, description: category.description } : {};
}

export default async function CategoryPage({ params }: Props) {
  const category = await getCategory((await params).category);
  if (!category) notFound();
  return <CatalogView categoryId={category.id} />;
}
