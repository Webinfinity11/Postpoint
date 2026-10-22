"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useUi } from "@/store/ui";

/** "Explore products" buttons inside modals / cart: close overlays and open the catalog */
export function useGoToCatalog() {
  const router = useRouter();
  return useCallback(() => {
    useUi.getState().closeAll();
    useUi.getState().clearFilters();
    router.push("/catalog");
  }, [router]);
}
