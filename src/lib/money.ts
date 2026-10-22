import { site } from "@/data/site";

export function formatMoney(value: number) {
  const amount = value.toFixed(2);
  return site.currency.position === "before" ? `${site.currency.symbol}${amount}` : `${amount} ${site.currency.symbol}`;
}

/** Replaces {key} placeholders in a text template */
export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ""));
}
