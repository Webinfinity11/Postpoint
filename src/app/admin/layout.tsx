import type { Metadata } from "next";
import "./admin.css";

export const metadata: Metadata = {
  title: "ადმინ პანელი",
  robots: { index: false, follow: false },
};

// სესიის შემოწმება ყოველ მოთხოვნაზე — ადმინის გვერდები არასოდეს მზადდება build-ის დროს
export const dynamic = "force-dynamic";

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="adm">{children}</div>;
}
