"use client";

import Link from "next/link";
import { ArrowUp, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/data/site";
import { useUi } from "@/store/ui";
import { Logo } from "@/components/ui/Logo";

const icons = { phone: Phone, email: Mail, address: MapPin } as const;
const ic = { className: "icon", "aria-hidden": true } as const;

export function Footer() {
  const openModal = useUi((s) => s.openModal);
  const t = site.footer;
  const facebook = site.contactPage.items.find((item) => item.type === "facebook");

  return (
    <footer className="site-footer">
      <div className="footer-inner section-pad">
        <div className="footer-cta">
          <div>
            <span className="footer-eyebrow">შემდეგი ნაბიჯი თქვენი ბიზნესისთვის</span>
            <h2>{t.ctaTitle}</h2>
            <p>{t.ctaText}</p>
          </div>
          <Link className="footer-cta-button" href="/contact">
            {t.ctaButton}<span><ArrowUpRight {...ic} /></span>
          </Link>
        </div>

        <div className="footer-main">
          <div className="footer-brand">
            <Logo height={40} variant="light" />
            <p>{t.description}</p>
            {facebook && (
              <a className="footer-social" href={facebook.href} target="_blank" rel="noopener noreferrer" aria-label={facebook.value}>
                {t.social}<ArrowUpRight {...ic} />
              </a>
            )}
          </div>

          <nav className="footer-nav" aria-labelledby="footer-company-title">
            <h2 id="footer-company-title">{t.company}</h2>
            <ul>
              <li><Link href="/about">{site.nav.about}</Link></li>
              <li><Link href="/catalog">{site.nav.catalog}</Link></li>
              <li><Link href="/contact">{site.nav.contact}</Link></li>
            </ul>
          </nav>

          <nav className="footer-nav" aria-labelledby="footer-information-title">
            <h2 id="footer-information-title">{t.information}</h2>
            <ul>
              <li><button type="button" onClick={() => openModal({ type: "policy" })}>{site.nav.policy}</button></li>
              <li><button type="button" onClick={() => openModal({ type: "faq" })}>{site.nav.faq}</button></li>
              <li><button type="button" onClick={() => openModal({ type: "support" })}>{site.nav.support}</button></li>
            </ul>
          </nav>

          <div className="footer-contact">
            <h2>{t.contact}</h2>
            <address>
              <ul>
                {(["phone", "email", "address"] as const).map((type) => {
                  const Icon = icons[type];
                  return (
                    <li key={type}>
                      <Icon {...ic} />
                      <div>
                        {site.contactPage.items.filter((item) => item.type === type).map((item) => (
                          <a
                            key={item.href}
                            href={item.href}
                            target={type === "address" ? "_blank" : undefined}
                            rel={type === "address" ? "noopener noreferrer" : undefined}
                            aria-label={`${item.label}: ${item.value}`}
                          >
                            {item.value}
                          </a>
                        ))}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </address>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {site.name}. {t.rights}</p>
          <span className="footer-signature">Your next point.</span>
          <button
            className="footer-back-top"
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}
          >
            {t.backToTop}<span><ArrowUp {...ic} /></span>
          </button>
        </div>
      </div>
    </footer>
  );
}
