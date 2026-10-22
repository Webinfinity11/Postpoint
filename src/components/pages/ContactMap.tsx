"use client";

import { ArrowUpRight, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

export function ContactMap() {
  const location = site.contactPage.location;
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    if (status !== "loading") return;
    const timeout = window.setTimeout(() => setStatus("error"), 12000);
    return () => window.clearTimeout(timeout);
  }, [status]);

  return (
    <div className={`contact-map contact-map-${status}`}>
      {status !== "ready" && (
        <div className="contact-map-placeholder">
          <MapPin className="icon" aria-hidden="true" />
          <strong>{location.address}</strong>
          <p role="status">{status === "loading" ? location.loading : location.unavailable}</p>
          <a href={location.href} target="_blank" rel="noopener noreferrer">
            {location.openMap} <ArrowUpRight className="icon" aria-hidden="true" />
          </a>
        </div>
      )}
      <iframe
        title={location.mapTitle}
        src={location.mapSrc}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        tabIndex={status === "ready" ? 0 : -1}
        aria-hidden={status !== "ready"}
        onLoad={() => setStatus("ready")}
        onError={() => setStatus("error")}
        style={{ opacity: status === "ready" ? 1 : 0, pointerEvents: status === "ready" ? "auto" : "none" }}
      />
    </div>
  );
}
