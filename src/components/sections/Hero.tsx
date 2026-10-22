"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { site } from "@/data/site";
import { PillLink } from "@/components/ui/PillButton";
import { fill } from "@/lib/money";

const ic = { className: "icon", strokeWidth: 1.65, "aria-hidden": true } as const;

export function Hero() {
  const { slides, autoplayMs, carouselLabel, slideLabel } = site.hero;
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const canAutoplay = slides.length > 1 && !hovered && !focused && inView && pageVisible && !reducedMotion;

  const go = useCallback((next: number) => {
    if (slides.length) setIndex(((next % slides.length) + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(media.matches);
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateMotion();
    updateVisibility();
    media.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);

    let observer: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.15 });
      if (rootRef.current) observer.observe(rootRef.current);
    } else {
      setInView(true);
    }

    return () => {
      media.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!canAutoplay) return;
    const timer = window.setTimeout(() => go(index + 1), autoplayMs);
    return () => window.clearTimeout(timer);
  }, [canAutoplay, index, autoplayMs, go]);

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || slides.length < 2) return;
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    go(index + (event.key === "ArrowRight" ? 1 : -1));
  };

  return (
    <section
      className="hero"
      ref={rootRef}
      aria-roledescription={carouselLabel}
      aria-label={site.name}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
      onKeyDown={onKeyDown}
    >
      <h1 id="home-title" className="sr-only">{slides[0]?.title ?? site.name}</h1>
      <div className="hero-track" aria-live={canAutoplay ? "off" : "polite"}>
        {slides.map((slide, i) => {
          const active = i === index;
          return (
            <div
              key={slide.image}
              className={`hero-slide ${active ? "active" : ""}`}
              role="group"
              aria-roledescription={slideLabel}
              aria-label={`${i + 1} / ${slides.length}`}
              aria-hidden={!active}
              inert={!active}
            >
              <Image
                className="hero-bg"
                src={slide.image}
                alt={slide.imageAlt}
                fill
                priority={i === 0}
                sizes="(min-width: 1778px) 1600px, 90vw"
              />
              <div className="hero-content">
                <span className="hero-eyebrow">{slide.eyebrow}</span>
                <h2>{slide.title}</h2>
                <p>{slide.text}</p>
                <PillLink href={slide.action === "about" ? "/about" : "/catalog"} variant="green">
                  {slide.button}
                </PillLink>
              </div>
            </div>
          );
        })}
      </div>

      {slides.length > 1 && (
        <div className="hero-controls">
          <button type="button" className="hero-arrow" onClick={() => go(index - 1)} aria-label={site.hero.prev}>
            <ChevronLeft {...ic} />
          </button>
          <div className="hero-dots">
            {slides.map((slide, i) => (
              <button
                type="button"
                key={slide.image}
                className={i === index ? "active" : ""}
                aria-label={fill(site.hero.goTo, { n: i + 1 })}
                aria-current={i === index ? "true" : undefined}
                onClick={() => go(i)}
              />
            ))}
          </div>
          <button type="button" className="hero-arrow" onClick={() => go(index + 1)} aria-label={site.hero.next}>
            <ChevronRight {...ic} />
          </button>
        </div>
      )}
    </section>
  );
}
