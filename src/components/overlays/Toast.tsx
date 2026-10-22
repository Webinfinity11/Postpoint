"use client";

import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useUi } from "@/store/ui";

export function Toast() {
  const toast = useUi((s) => s.toast);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!toast) return;
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 2600);
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <div className={`toast ${visible ? "show" : ""}`} role="status" aria-live="polite">
      <Check className="icon" strokeWidth={1.65} aria-hidden="true" />
      <span>{toast?.message}</span>
    </div>
  );
}
