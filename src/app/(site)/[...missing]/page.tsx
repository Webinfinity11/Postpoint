import { notFound } from "next/navigation";

// უცნობი მისამართი → (site)/not-found.tsx, header-ით და footer-ით
export default function Missing() {
  notFound();
}
