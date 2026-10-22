"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCatalog } from "@/components/providers/CatalogProvider";
import { CategoryCard } from "@/components/product/CategoryCard";
import { site } from "@/data/site";

const ic = { className: "icon", "aria-hidden": true } as const;

export function CategoryCarousel() {
  const { categories, categoryCounts } = useCatalog();
  const t = site.sections.categoryCarousel;
  const rootRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [selected, setSelected] = useState(0);
  const plugins = useMemo(() => [AutoScroll({
    speed: 0.65,
    startDelay: 0,
    playOnInit: false,
    stopOnInteraction: true,
    stopOnMouseEnter: false,
    stopOnFocusIn: false,
  })], []);
  const [viewportRef, api] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
    duration: 40,
  }, plugins);
  const shouldPlay = !hovered && !focused && inView && pageVisible && !reducedMotion;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(media.matches);
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateMotion();
    updateVisibility();
    media.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.15 });
    if (rootRef.current) observer.observe(rootRef.current);
    return () => {
      media.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!api) return;
    const autoScroll = api.plugins().autoScroll;
    const syncPlayback = () => {
      if (shouldPlay && !dragging.current) autoScroll.play();
      else autoScroll.stop();
    };
    const updateSelected = () => setSelected(api.selectedScrollSnap());
    const onPointerDown = () => {
      dragging.current = true;
      autoScroll.stop();
    };
    const onPointerUp = () => { dragging.current = false; };
    const onReInit = () => {
      dragging.current = false;
      updateSelected();
      syncPlayback();
    };
    api.on("select", updateSelected).on("reInit", onReInit).on("settle", syncPlayback)
      .on("pointerDown", onPointerDown).on("pointerUp", onPointerUp);
    updateSelected();
    syncPlayback();
    return () => {
      autoScroll.stop();
      api.off("select", updateSelected).off("reInit", onReInit).off("settle", syncPlayback)
        .off("pointerDown", onPointerDown).off("pointerUp", onPointerUp);
    };
  }, [api, shouldPlay]);

  const move = useCallback((direction: "prev" | "next") => {
    if (!api) return;
    api.plugins().autoScroll.stop();
    if (direction === "prev") api.scrollPrev(reducedMotion);
    else api.scrollNext(reducedMotion);
  }, [api, reducedMotion]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    move(event.key === "ArrowLeft" ? "prev" : "next");
  };

  return (
    <div
      className="category-carousel"
      ref={rootRef}
      role="region"
      aria-roledescription={t.label}
      aria-labelledby="categories-title"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <div className="category-carousel-viewport" id="category-carousel-viewport" ref={viewportRef} onKeyDown={onKeyDown}>
        <div className="category-carousel-track">
          {categories.map((category, index) => (
            <div className="category-carousel-slide" key={category.id} role="group" aria-roledescription={t.slide} aria-label={`${index + 1} / ${categories.length}`}>
              <CategoryCard category={category} count={categoryCounts[category.id] ?? 0} sizes="(max-width: 600px) 85vw, (max-width: 900px) 50vw, 25vw" />
            </div>
          ))}
        </div>
      </div>
      <div className="category-carousel-toolbar">
        <span className="category-carousel-position" aria-hidden="true"><strong>{String(selected + 1).padStart(2, "0")}</strong><span>/</span>{String(categories.length).padStart(2, "0")}</span>
        <div className="category-carousel-controls">
          <button type="button" aria-label={t.prev} aria-controls="category-carousel-viewport" onClick={() => move("prev")}><ArrowLeft {...ic} /></button>
          <button type="button" aria-label={t.next} aria-controls="category-carousel-viewport" onClick={() => move("next")}><ArrowRight {...ic} /></button>
        </div>
      </div>
    </div>
  );
}
