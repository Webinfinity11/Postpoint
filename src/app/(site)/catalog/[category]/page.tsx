import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategory } from "@/lib/data";
import { CatalogView } from "@/components/pages/CatalogView";

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await getCategory((await params).category);
  return category ? { title: category.name, description: category.description } : {};
}

export default async function CategoryPage({ params }: Props) {
  const category = await getCategory((await params).category);
  if (!category) notFound();
  return <CatalogView categoryId={category.id} />;
}
