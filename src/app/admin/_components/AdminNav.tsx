"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Shapes } from "lucide-react";

const links = [
  { href: "/admin", label: "მიმოხილვა", icon: LayoutDashboard },
  { href: "/admin/products", label: "პროდუქტები", icon: Package },
  { href: "/admin/categories", label: "კატეგორიები", icon: Shapes },
];

export function AdminNav() {
  const path = usePathname();
  return (
    <nav className="adm-nav">
      {links.map(({ href, label, icon: Icon }) => {
        const active = href === "/admin" ? path === href : path.startsWith(href);
        return (
          <Link key={href} href={href} className={active ? "is-active" : ""} aria-current={active ? "page" : undefined}>
            <Icon className="icon" aria-hidden="true" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
