"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { site } from "@/data/site";
import { useCatalog } from "@/components/providers/CatalogProvider";
import { fill } from "@/lib/money";

const ic = { className: "icon", strokeWidth: 1.65, "aria-hidden": true } as const;

/** Header links: About · Catalog (hover dropdown with categories) · Contact */
export function MainNav() {
  const { categories, categoryCounts } = useCatalog();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const canHover = () => window.matchMedia("(hover: hover)").matches;

  const catalogActive = pathname.startsWith("/catalog") || pathname.startsWith("/product");
  const aboutActive = pathname === "/about";
  const contactActive = pathname === "/contact";

  // Close on page change, outside click and Escape
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onClick = (e: globalThis.MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const show = () => {
    clearTimeout(closeTimer.current);
    if (canHover()) setOpen(true);
  };
  const hide = () => {
    if (!canHover()) return;
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };
  // Mouse: the link opens /catalog (the menu opens on hover). Touch: first tap opens the menu.
  const onTrigger = (e: MouseEvent) => {
    if (canHover()) return;
    e.preventDefault();
    setOpen((v) => !v);
  };

  return (
    <nav className="main-nav" aria-label={site.nav.label}>
      <Link href="/about" className={`nav-link ${aboutActive ? "active" : ""}`} aria-current={aboutActive ? "page" : undefined}>
        {site.nav.about}
      </Link>

      <div className={`catalog-wrap ${open ? "open" : ""}`} ref={wrapRef} onMouseEnter={show} onMouseLeave={hide}>
        <Link
          href="/catalog"
          className={`nav-link ${catalogActive ? "active" : ""}`}
          aria-current={catalogActive ? "page" : undefined}
          aria-expanded={open}
          aria-controls="catalog-menu"
          onClick={onTrigger}
        >
          {site.nav.catalog}
          <ChevronDown {...ic} className="icon nav-chevron" />
        </Link>

        <div className="catalog-menu" id="catalog-menu" inert={!open}>
          <div className="catalog-grid">
            {categories.map((c, i) => (
              <Link
                key={c.id}
                href={`/catalog/${c.id}`}
                className="catalog-item"
                style={{ "--i": i, "--tint": c.tint } as CSSProperties}
                onClick={() => setOpen(false)}
              >
                <span className="catalog-thumb">
                  <Image src={c.image} alt="" width={64} height={52} />
                </span>
                <span className="catalog-text">
                  <strong>{c.name}</strong>
                  <small>{fill(site.sections.categoryCount, { count: categoryCounts[c.id] ?? 0 })}</small>
                </span>
              </Link>
            ))}
          </div>
          <Link href="/catalog" className="catalog-all" onClick={() => setOpen(false)}>
            {site.nav.allProducts} <ArrowRight {...ic} />
          </Link>
        </div>
      </div>

      <Link href="/contact" className={`nav-link ${contactActive ? "active" : ""}`} aria-current={contactActive ? "page" : undefined}>
        {site.nav.contact}
      </Link>
    </nav>
  );
}
