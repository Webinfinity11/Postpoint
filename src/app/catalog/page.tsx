import type { Metadata } from "next";
import { site } from "@/data/site";
import { CatalogView } from "@/components/pages/CatalogView";

export const metadata: Metadata = {
  title: site.catalogPage.title,
  description: site.catalogPage.text,
};

export default function CatalogPage() {
  return <CatalogView />;
}
