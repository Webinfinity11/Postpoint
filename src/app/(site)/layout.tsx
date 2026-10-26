import { getCatalog } from "@/lib/data";
import { CatalogProvider } from "@/components/providers/CatalogProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RouteWatcher } from "@/components/layout/RouteWatcher";
import { BrandLoader } from "@/components/layout/BrandLoader";
import { CartDrawer } from "@/components/overlays/CartDrawer";
import { ContentModal } from "@/components/overlays/ContentModal";
import { Toast } from "@/components/overlays/Toast";
import "../pages.css";
import "../loader.css";
import "../pospoint.css";
import "../brand-components.css";

// კატალოგი ბაზიდან იკითხება (ქეშით, ადმინიდან შენახვისას ახლდება), ამიტომ გვერდები build-ის დროს არ მზადდება
export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const catalog = await getCatalog();

  return (
    <>
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
    </>
  );
}
