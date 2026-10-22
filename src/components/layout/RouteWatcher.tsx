"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useUi } from "@/store/ui";

/** On every page change: close the cart / modals, and drop the search unless we land on the catalog */
export function RouteWatcher() {
  const pathname = usePathname();
  useEffect(() => {
    const ui = useUi.getState();
    ui.closeAll();
    if (pathname !== "/catalog" && ui.query) ui.clearFilters();
  }, [pathname]);
  return null;
}
