"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { site } from "@/data/site";
import { useCatalog } from "@/components/providers/CatalogProvider";
import { useUi } from "@/store/ui";
import { PillLink } from "@/components/ui/PillButton";
import { Lines } from "@/components/ui/Lines";

export function Deals() {
  const { offers } = useCatalog();
  const openModal = useUi((s) => s.openModal);
  const banner = site.produceBanner;

  return (
    <section className="promotions section-pad" id="deals" aria-label={banner.label}>
      <div className="produce-banner">
        <div className="produce-banner-art">
          <Image src={banner.image} alt={banner.imageAlt} width={229} height={148} />
        </div>
        <div className="produce-banner-content">
          <h2>
            <Lines lines={banner.title} />
          </h2>
          <p>{banner.text}</p>
          <PillLink href={`/catalog/${banner.filterCategory}`}>{banner.button}</PillLink>
        </div>
        <Image className="broccoli" src={banner.decoration} alt="" width={58} height={68} />
      </div>

      <div className="offer-grid">
        {offers.map((o) => (
          <button type="button" key={o.id} className={`offer-card offer-${o.theme}`} onClick={() => openModal({ type: "offer", id: o.id })}>
            <h3>
              <Lines lines={o.title} />
            </h3>
            <Image src={o.image} alt={o.imageAlt} width={106} height={84} />
            <div className="offer-bottom">
              <p>{o.text}</p>
              <span className="dark-arrow" aria-hidden="true">
                <ChevronRight className="icon" strokeWidth={1.65} />
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
