import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { aboutPage } from "@/data/about";
import { site } from "@/data/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PillLink } from "@/components/ui/PillButton";

const ic = { className: "icon", strokeWidth: 1.65, "aria-hidden": true } as const;

export function AboutView() {
  const t = aboutPage;

  return (
    <div className="page section-pad about-page">
      <Breadcrumbs items={[{ label: t.title }]} />

      <header className="page-head about-page-head">
        <span className="page-eyebrow">{site.name}</span>
        <h1>{t.title}</h1>
        <p className="page-lead">{t.lead}</p>
      </header>

      <div className="about-gallery">
        {t.gallery.map((photo, index) => (
          <figure className="about-photo" key={photo.src}>
            <div className="about-photo-frame">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={1536}
                height={1024}
                sizes={index === 0 ? "(max-width: 600px) 100vw, 65vw" : "(max-width: 600px) 100vw, 35vw"}
                priority={index === 0}
              />
            </div>
            <figcaption><span>{String(index + 1).padStart(2, "0")}</span>{photo.caption}</figcaption>
          </figure>
        ))}
      </div>

      <section className="about-story" aria-labelledby="about-story-title">
        <div className="about-story-heading">
          <span className="page-eyebrow">{t.story.eyebrow}</span>
          <h2 id="about-story-title">
            {t.story.headingLines.map((line) => <span key={line}>{line}</span>)}
            <span className="about-heading-accent">{t.story.headingAccent}</span>
          </h2>
          <Link href="/contact" className="about-contact-link">
            {t.story.contactLabel}<ArrowUpRight {...ic} />
          </Link>
        </div>
        <div className="about-story-copy">
          {t.story.paragraphs.map((paragraph, index) => (
            <p className={index === 0 ? "about-story-lead" : undefined} key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <ul className="about-benefits">
        {t.story.benefits.map((benefit, index) => (
          <li key={benefit}>
            <span className="about-benefit-number">{String(index + 1).padStart(2, "0")}</span>
            <p>{benefit}</p>
            <span className="about-benefit-check"><Check {...ic} /></span>
          </li>
        ))}
      </ul>

      <section className="about-promise" aria-labelledby="about-promise-title">
        <div>
          <span className="page-eyebrow">{t.promise.eyebrow}</span>
          <h2 id="about-promise-title">{t.promise.title}<span>{t.promise.accent}</span></h2>
          <PillLink href="/catalog">{t.promise.catalogLabel}</PillLink>
        </div>
        <div className="about-promise-copy">
          {t.promise.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>
    </div>
  );
}
