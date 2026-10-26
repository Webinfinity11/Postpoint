import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, MoveUpRight } from "lucide-react";
import { aboutPage } from "@/data/about";
import { site } from "@/data/site";

export function HomeAbout() {
  return (
    <section className="home-about pospoint-about section-pad" aria-labelledby="home-about-title">
      <div className="home-about-photo">
        <Image src="/images/brand/pospoint-retail.webp" alt="თანამედროვე სავაჭრო სივრცის კონცეფცია სალაროს ტექნიკით" width={768} height={512} sizes="(max-width: 900px) 100vw, 45vw" />
        <div className="home-about-photo-label">
          <span><i aria-hidden="true" />ბიზნესის შემდეგი ნაბიჯი</span>
          <MoveUpRight className="icon" aria-hidden="true" />
        </div>
      </div>
      <div className="home-about-copy">
        <span className="page-eyebrow"><span aria-hidden="true" />{site.homeAbout.eyebrow}</span>
        <h2 id="home-about-title">{aboutPage.story.headingLines.join(" ")} <span>{aboutPage.story.headingAccent}</span></h2>
        <p>{aboutPage.story.paragraphs[2]}</p>
        <ul>
          {site.homeAbout.services.map((service) => <li key={service}><span className="home-about-check"><Check className="icon" aria-hidden="true" /></span>{service}</li>)}
        </ul>
        <Link href="/about" className="home-about-link">{site.nav.about}<ArrowUpRight className="icon" aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
