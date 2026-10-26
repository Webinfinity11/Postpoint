"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

/** "Saved" banner shown after a redirect with ?saved=1; removes the flag from the URL */
export function SavedNotice() {
  const [visible, setVisible] = useState(true);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    router.replace(path, { scroll: false });
    const timer = setTimeout(() => setVisible(false), 3500);
    return () => clearTimeout(timer);
  }, [router, path]);

  return visible ? <p className="adm-success" role="status">ცვლილებები შენახულია ✓</p> : null;
}
