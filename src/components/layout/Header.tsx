"use client";

import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight, Heart, Phone, Search, ShoppingBag, X } from "lucide-react";
import { site } from "@/data/site";
import { useCart } from "@/store/cart";
import { useFavorites } from "@/store/favorites";
import { scrollToShop, useUi } from "@/store/ui";
import { fill } from "@/lib/money";
import { Logo } from "@/components/ui/Logo";
import { MainNav } from "./MainNav";

const ic = { className: "icon", strokeWidth: 1.65, "aria-hidden": true } as const;

export function Header() {
  const cartCount = useCart((s) => Object.values(s.items).reduce((a, b) => a + b, 0));
  const favCount = useFavorites((s) => s.ids.length);
  const { query, setQuery, clearFilters, openCart, openModal } = useUi();
  const pathname = usePathname();
  const router = useRouter();
  const phone = site.contactPage.items.find((item) => item.type === "phone");
  // Home filters its own product list; on every other page the search shows results in /catalog
  const searchHere = pathname === "/" || pathname === "/catalog";

  return (
    <header className="site-header">
      <div className="header-utility">
        <p><span className="header-point" aria-hidden="true" />{site.tagline}</p>
        <div className="header-utility-links">
          {phone && <a href={phone.href}><Phone {...ic} />{phone.value}</a>}
          <button type="button" onClick={() => openModal({ type: "support" })}>{site.nav.support}<ArrowUpRight {...ic} /></button>
        </div>
      </div>
      <div className="header-main">
        <Logo height={34} />

        <MainNav />

        <form
          className="search-form"
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            if (pathname === "/") scrollToShop();
            else if (!searchHere) router.push("/catalog");
            (e.currentTarget.querySelector("input") as HTMLInputElement).blur();
          }}
        >
          <Search {...ic} />
          <input
            type="search"
            placeholder={site.header.searchPlaceholder}
            autoComplete="off"
            aria-label={site.header.searchLabel}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value && !searchHere) router.push("/catalog");
            }}
          />
          {query && (
            <button type="button" className="search-reset" aria-label={site.header.clearSearch} onClick={clearFilters}>
              <X {...ic} />
            </button>
          )}
        </form>

        <div className="header-actions">
          <button type="button" className="text-button header-favorites" onClick={() => openModal({ type: "favorites" })} aria-label={site.header.loved}>
            <Heart {...ic} />
            <span>{site.header.loved}</span>
            {favCount > 0 && <b className="small-count">{favCount}</b>}
          </button>
          <button type="button" className="text-button header-cart" onClick={openCart} aria-label={fill(site.header.cartLabel, { count: cartCount })}>
            <ShoppingBag {...ic} />
            <span>{site.header.cart}</span>
            <b className="small-count">{cartCount}</b>
          </button>
        </div>
      </div>
    </header>
  );
}
