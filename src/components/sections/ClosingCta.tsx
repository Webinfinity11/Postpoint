"use client";

import Image from "next/image";
import { site } from "@/data/site";
import { PillLink } from "@/components/ui/PillButton";
import { Lines } from "@/components/ui/Lines";

export function ClosingCta() {
  const c = site.closing;
  return (
    <section className="closing-section section-pad">
      <div className="closing-banner">
        <div>
          <h2>
            <Lines lines={c.title} />
          </h2>
          <p>{c.text}</p>
          <PillLink href="/catalog" variant="green">
            {c.button}
          </PillLink>
        </div>
        <Image src={c.image} alt={c.imageAlt} width={208} height={157} />
      </div>
    </section>
  );
}
