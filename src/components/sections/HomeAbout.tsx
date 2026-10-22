import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { aboutPage } from "@/data/about";
import { site } from "@/data/site";

export function HomeAbout() {
  return (
    <section className="home-about section-pad" aria-labelledby="home-about-title">
      <div className="home-about-photo">
        <Image src={aboutPage.gallery[1].src} alt={aboutPage.gallery[1].alt} width={768} height={512} sizes="(max-width: 900px) 100vw, 45vw" />
      </div>
      <div className="home-about-copy">
        <span className="page-eyebrow">{site.homeAbout.eyebrow}</span>
        <h2 id="home-about-title">{aboutPage.story.headingLines.join(" ")} <span>{aboutPage.story.headingAccent}</span></h2>
        <p>{aboutPage.story.paragraphs[2]}</p>
        <ul>
          {site.homeAbout.services.map((service) => <li key={service}><Check className="icon" aria-hidden="true" />{service}</li>)}
        </ul>
        <Link href="/about" className="home-about-link">{site.nav.about}<ArrowUpRight className="icon" aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
