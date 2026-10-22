import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/types";
import { fill } from "@/lib/money";
import { site } from "@/data/site";

export function CategoryCard({ category, count, sizes = "(max-width: 900px) 50vw, 33vw" }: { category: Category; count: number; sizes?: string }) {
  return (
    <Link href={`/catalog/${category.id}`} className="category-card" draggable={false}>
      <div className="category-photo">
        <Image src={category.image} alt="" width={600} height={450} sizes={sizes} draggable={false} />
      </div>
      <div className="category-card-copy">
        <div>
          <h3>{category.name}</h3>
          <p>{fill(site.sections.categoryCount, { count })}</p>
        </div>
        <span className="category-card-arrow"><ArrowUpRight className="icon" aria-hidden="true" /></span>
      </div>
    </Link>
  );
}
