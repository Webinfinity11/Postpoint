import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export function ArrowCircle() {
  return (
    <span className="arrow-circle" aria-hidden="true">
      <ChevronRight className="icon" strokeWidth={1.65} />
    </span>
  );
}

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "dark" | "green";
  children: ReactNode;
};

/** Rounded button with the white arrow circle on the right */
export function PillButton({ variant = "dark", className = "", children, ...rest }: Props) {
  return (
    <button type="button" className={`pill-button ${variant === "green" ? "green" : ""} ${className}`} {...rest}>
      {children}
      <ArrowCircle />
    </button>
  );
}

/** Same look as PillButton, but navigates to another page */
export function PillLink({ href, variant = "dark", className = "", children }: { href: string; variant?: "dark" | "green"; className?: string; children: ReactNode }) {
  return (
    <Link href={href} className={`pill-button ${variant === "green" ? "green" : ""} ${className}`}>
      {children}
      <ArrowCircle />
    </Link>
  );
}
