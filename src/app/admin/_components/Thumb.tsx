/* eslint-disable @next/next/no-img-element */
import { ImageOff } from "lucide-react";

export function Thumb({ src, alt }: { src: string; alt: string }) {
  return src ? (
    <img className="adm-thumb" src={src} alt={alt} loading="lazy" />
  ) : (
    <span className="adm-thumb adm-thumb-empty" title="სურათი არ არის"><ImageOff className="icon" aria-hidden="true" /></span>
  );
}
