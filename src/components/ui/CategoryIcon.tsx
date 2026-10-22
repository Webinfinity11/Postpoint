import { Cctv, Monitor, ScanBarcode, ShoppingCart, Tags, Warehouse } from "lucide-react";
import type { CategoryIconName } from "@/types";

const icons = { monitor: Monitor, scan: ScanBarcode, cart: ShoppingCart, tags: Tags, warehouse: Warehouse, cctv: Cctv };

export function CategoryIcon({ name, className = "icon" }: { name: CategoryIconName; className?: string }) {
  const Icon = icons[name] ?? Monitor;
  return <Icon className={className} strokeWidth={1.4} aria-hidden="true" />;
}
