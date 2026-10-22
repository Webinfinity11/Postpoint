import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { site } from "@/data/site";
import { getCatalog } from "@/lib/data";
import { CatalogProvider } from "@/components/providers/CatalogProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RouteWatcher } from "@/components/layout/RouteWatcher";
import { BrandLoader } from "@/components/layout/BrandLoader";
import { CartDrawer } from "@/components/overlays/CartDrawer";
import { ContentModal } from "@/components/overlays/ContentModal";
import { Toast } from "@/components/overlays/Toast";
import "./globals.css";
import "./pages.css";
import "./loader.css";

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
  icons: { icon: "/logo.svg" },
};

export const viewport: Viewport = {
  themeColor: "#50b649",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // ფაზა 2: getCatalog() წაიკითხავს ბაზიდან — კომპონენტები არ შეიცვლება
  const catalog = await getCatalog();

  return (
    <html lang="ka" className={`${inter.variable} ${georgian.variable}`}>
      {/* suppressHydrationWarning: browser extensions (e.g. ColorZilla) add attributes to <body> */}
      <body suppressHydrationWarning>
        <BrandLoader />
        <CatalogProvider catalog={catalog}>
          <div className="site-shell">
            <Header />
            <main id="main">{children}</main>
            <Footer />
          </div>
          <CartDrawer />
          <ContentModal />
          <Toast />
          <RouteWatcher />
        </CatalogProvider>
      </body>
    </html>
  );
}
