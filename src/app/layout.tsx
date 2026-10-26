import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { site } from "@/data/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
// ქართული ფონტი: public/fonts/TWSAjaraTVMt-Regular.ttf (Latin და ციფრები — Inter)
const georgian = localFont({
  src: "../../public/fonts/TWSAjaraTVMt-Regular.ttf",
  variable: "--font-georgian",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: `${site.name} - ${site.tagline}`, template: `%s - ${site.name}` },
  description: site.description,
  applicationName: site.name,
  icons: { icon: { url: "/brand/favicon.svg", type: "image/svg+xml" } },
};

export const viewport: Viewport = {
  themeColor: "#2458ED",
};

// საჯარო საიტი: src/app/(site)/layout.tsx, ადმინ პანელი: src/app/admin/
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ka" className={`${inter.variable} ${georgian.variable}`}>
      {/* suppressHydrationWarning: browser extensions (e.g. ColorZilla) add attributes to <body> */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
