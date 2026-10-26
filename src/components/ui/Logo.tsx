import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

export function Logo({ height = 36, className = "", variant = "default" }: { height?: number; className?: string; variant?: "default" | "light" }) {
  const width = Math.round((site.logo.width / site.logo.height) * height);
  return (
    <Link className={`brand ${className}`} href="/" aria-label={site.header.home}>
      <Image src={variant === "light" ? "/brand/logo-light.svg" : site.logo.src} alt={site.name} width={width} height={height} priority />
    </Link>
  );
}
