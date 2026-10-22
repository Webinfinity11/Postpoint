import { ArrowRight, ArrowUpRight, Mail, MapPin, Navigation, Phone } from "lucide-react";
import type { SVGProps } from "react";
import { site } from "@/data/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContactMap } from "@/components/pages/ContactMap";

const ic = { className: "icon", strokeWidth: 1.65, "aria-hidden": true } as const;

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path fill="currentColor" stroke="none" d="M14 22v-9h3l.5-4H14V6.5c0-1 .3-1.5 1.7-1.5H18V1.4C17.4 1.2 16.3 1 15 1c-3 0-5 1.8-5 5v3H7v4h3v9z" />
    </svg>
  );
}

export function ContactView() {
  const t = site.contactPage;
  const facebook = t.items.find((item) => item.type === "facebook");

  return (
    <div className="page section-pad contact-page">
      <Breadcrumbs items={[{ label: t.title }]} />

      <header className="contact-hero">
        <div>
          <span className="page-eyebrow">{t.eyebrow}</span>
          <h1>{t.intro.title.join(" ")}</h1>
          <p className="page-lead">{t.text}</p>
        </div>
        <p className="contact-hero-note">{t.intro.text}</p>
      </header>

      <div className="contact-channels">
        {(["phone", "email"] as const).map((channel) => {
          const Icon = channel === "phone" ? Phone : Mail;
          const copy = t.channels[channel];

          return (
            <section className={`contact-channel contact-channel-${channel}`} key={channel} aria-labelledby={`contact-${channel}-title`}>
              <div className="contact-channel-heading">
                <span className="contact-channel-icon"><Icon {...ic} /></span>
                <div>
                  <h2 id={`contact-${channel}-title`}>{copy.title}</h2>
                  <p>{copy.text}</p>
                </div>
              </div>
              <ul className="contact-options">
                {t.items.filter((item) => item.type === channel).map((item) => (
                  <li key={item.href}>
                    <a href={item.href} aria-label={`${item.label}: ${item.value}`}>
                      <span>
                        <small>{item.label}</small>
                        <strong>{item.value}</strong>
                      </span>
                      <span className="contact-option-arrow"><ArrowUpRight {...ic} /></span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <section className="contact-visit" aria-labelledby="contact-location-title">
        <div className="contact-visit-info">
          <span className="page-eyebrow"><MapPin {...ic} />{t.location.eyebrow}</span>
          <h2 id="contact-location-title">{t.location.title}</h2>
          <p className="contact-address">{t.location.address}</p>
          <a className="solid-button" href={t.location.href} target="_blank" rel="noopener noreferrer">
            <Navigation {...ic} /> {t.location.button} <ArrowUpRight {...ic} />
          </a>
          {facebook && (
            <a className="contact-social" href={facebook.href} target="_blank" rel="noopener noreferrer">
              <span className="contact-social-icon"><FacebookIcon {...ic} /></span>
              <span><strong>{t.social.title}</strong><small>{t.social.text}</small></span>
              <ArrowRight {...ic} />
            </a>
          )}
        </div>
        <ContactMap />
      </section>
    </div>
  );
}
