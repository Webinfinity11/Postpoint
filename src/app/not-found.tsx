import { site } from "@/data/site";
import { PillLink } from "@/components/ui/PillButton";

export default function NotFound() {
  const t = site.notFound;
  return (
    <div className="page section-pad not-found">
      <span className="not-found-code">404</span>
      <h1>{t.title}</h1>
      <p className="page-lead">{t.text}</p>
      <div className="not-found-actions">
        <PillLink href="/" variant="green">
          {t.home}
        </PillLink>
        <PillLink href="/catalog">{t.catalog}</PillLink>
      </div>
    </div>
  );
}
