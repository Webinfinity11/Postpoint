"use client";

import { useEffect, useState } from "react";

const MIN_VISIBLE_MS = 600;
const MAX_WAIT_MS = 1800;
const EXIT_MS = 350;

/** A first-document welcome; the persistent root layout keeps it out of route changes. */
export function BrandLoader() {
  const [phase, setPhase] = useState<"loading" | "leaving" | "hidden">("loading");

  useEffect(() => {
    let active = true;
    let finishing = false;
    let minimumTimer: number | undefined;
    let deadlineTimer: number | undefined;
    let exitTimer: number | undefined;
    let windowReady = document.readyState === "complete";
    let fontsReady = !document.fonts || document.fonts.status === "loaded";
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const finish = (immediately = false) => {
      if (!active || finishing) return;
      finishing = true;
      window.clearTimeout(minimumTimer);
      window.clearTimeout(deadlineTimer);
      if (immediately) {
        setPhase("hidden");
        return;
      }
      setPhase("leaving");
      exitTimer = window.setTimeout(() => {
        if (active) setPhase("hidden");
      }, EXIT_MS);
    };

    const checkReady = () => {
      if (!active || finishing || !windowReady || !fontsReady) return;
      window.clearTimeout(minimumTimer);
      // Count from document entry, so delayed hydration never adds another wait.
      minimumTimer = window.setTimeout(() => finish(), Math.max(0, MIN_VISIBLE_MS - performance.now()));
    };

    const onLoad = () => {
      windowReady = true;
      checkReady();
    };
    const onInteraction = () => finish(true);
    const onMotionChange = () => {
      if (reducedMotion.matches) finish(true);
    };

    if (reducedMotion.matches || performance.now() >= MAX_WAIT_MS) {
      finish(true);
    } else {
      deadlineTimer = window.setTimeout(() => finish(), Math.max(0, MAX_WAIT_MS - performance.now()));
      window.addEventListener("load", onLoad, { once: true });
      window.addEventListener("pointerdown", onInteraction, { once: true, passive: true });
      window.addEventListener("keydown", onInteraction, { once: true });
      reducedMotion.addEventListener("change", onMotionChange);

      if (!fontsReady) {
        // Failed fonts must be just as safe as successfully loaded fonts.
        const onFontsSettled = () => {
          fontsReady = true;
          checkReady();
        };
        void document.fonts.ready.then(onFontsSettled, onFontsSettled);
      }
      checkReady();
    }

    return () => {
      active = false;
      window.clearTimeout(minimumTimer);
      window.clearTimeout(deadlineTimer);
      window.clearTimeout(exitTimer);
      window.removeEventListener("load", onLoad);
      window.removeEventListener("pointerdown", onInteraction);
      window.removeEventListener("keydown", onInteraction);
      reducedMotion.removeEventListener("change", onMotionChange);
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <>
      <div
        className={`brand-loader${phase === "leaving" ? " brand-loader--leaving" : ""}`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        aria-hidden={phase === "leaving" ? true : undefined}
      >
        <div className="brand-loader__content">
          <div className="brand-loader__frame" aria-hidden="true">
            <span className="brand-loader__corner brand-loader__corner--tl" />
            <span className="brand-loader__corner brand-loader__corner--tr" />
            <span className="brand-loader__corner brand-loader__corner--bl" />
            <span className="brand-loader__corner brand-loader__corner--br" />
            {/* A local SVG avoids a request to an image optimization service. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="brand-loader__logo" src="/logo.svg" width="220" height="40" alt="" />
            <span className="brand-loader__scan" />
          </div>
          <span className="brand-loader__label">
            <span className="brand-loader__dot" aria-hidden="true" />
            გვერდი იტვირთება
          </span>
        </div>
      </div>
      <noscript>
        <style>{`.brand-loader { display: none !important; }`}</style>
      </noscript>
    </>
  );
}
