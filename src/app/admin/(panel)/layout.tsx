import { requireAdmin } from "@/lib/auth";
import { hasDatabase } from "@/lib/db";
import { logout } from "../actions";
import { AdminNav } from "../_components/AdminNav";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div className="adm-shell">
      <aside className="adm-sidebar">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="adm-logo" src="/brand/logo-light.svg" alt="Pospoint" width={140} height={26} />
        <AdminNav />
        <div className="adm-sidebar-foot">
          <a href="/" target="_blank" rel="noreferrer">საიტის ნახვა ↗</a>
          <form action={logout}>
            <button>გასვლა</button>
          </form>
        </div>
      </aside>
      <div className="adm-main">
        {!hasDatabase && (
          <p className="adm-alert">
            ბაზა არ არის დაკავშირებული: მიუთითე <code>DATABASE_URL</code>. მანამდე საიტი სტატიკურ მონაცემებს აჩვენებს და ცვლილებების შენახვა შეუძლებელია.
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
