import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Fragment } from "react";
import { site } from "@/data/site";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ label: site.breadcrumbs.home, href: "/" }, ...items];
  return (
    <nav className="breadcrumbs" aria-label={site.breadcrumbs.label}>
      {all.map((c, i) => (
        <Fragment key={i}>
          {i > 0 && <ChevronRight className="icon" strokeWidth={1.65} aria-hidden="true" />}
          {c.href && i < all.length - 1 ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
        </Fragment>
      ))}
    </nav>
  );
}
