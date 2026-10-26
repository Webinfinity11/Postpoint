"use client";

import { site } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PillLink } from "@/components/ui/PillButton";
import { CategoryCarousel } from "@/components/product/CategoryCarousel";

export function PopularCategories() {
  return (
    <section className="categories-section section-pad" aria-labelledby="categories-title">
      <SectionHeading id="categories-title" eyebrow="01 / იპოვეთ თქვენი მიმართულება" title="გადაწყვეტილება ყველა ბიზნესისთვის" action={<PillLink href="/catalog">{site.sections.showAll}</PillLink>} />
      <CategoryCarousel />
    </section>
  );
}
