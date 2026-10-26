<!-- Design context synchronized with .21st/design.json and the current Pospoint rebrand. -->
# Pospoint design context

Updated 2026-10-26. Georgian retail equipment catalog built with Next.js, React, and Tailwind v4.

## Identity and palette

The original geometric p/point symbol and custom lowercase wordmark use a 352 × 64 viewBox. Use `public/brand/logo.svg` on light surfaces and `public/brand/logo-light.svg` on ink surfaces. The symbol and favicon are 64 × 64. The brand guide and downloads are at `public/brand/index.html`.

| Role | Token | Value |
| --- | --- | --- |
| Cobalt / primary actions | `--primary` | `#2458ED` |
| Primary hover | `--primary-hover` | `#1946CF` |
| Ink / text and footer | `--ink` | `#141B2D` |
| Chalk / quiet surfaces | `--surface-alt` | `#F5F7FA` |
| Mist / restrained accents | `--accent` | `#DCE6FF` |
| Surface | `--surface` | `#F0F3F8` |
| Border | `--line` | `#E1E5EC` |
| Secondary text | `--gray-dark` | `#606A7D` |

Use a light interface with a dark footer and cobalt actions. Green and lime accents have been removed at the user's request.

## Typography and structure

Inter provides Latin text and numerals; the local TWS Ajara TV Mt font provides Georgian. The vector wordmark is independent of fonts. Use the shared stack from `src/app/globals.css` and comfortable line spacing for Georgian text.

Maintain a centered content width of 90% with a 1600px cap. Use 8px control corners, 12px product/category cards, and 16px larger surfaces. Quiet borders and generous whitespace support product imagery and readable details.

## Current decisions

- Preserve the original two-slide homepage hero carousel and the composition of the original `hero1.webp` and `hero2.webp` photographs. Display their recolored variants, `public/images/brand/hero1-pospoint.webp` and `public/images/brand/hero2-pospoint.webp`, with cobalt/navy grading and no green or lime tint. Use ink overlays for readable text. Retain Georgian copy, catalog/company links, carousel controls, pause behavior, and reduced-motion support.
- Keep the category carousel, eight featured products, interactive category product tabs, and compact company introduction. Selected tabs and actions use cobalt; category backgrounds use neutral-blue tints.
- Use the Pospoint symbol and wordmark consistently in the header, footer, first-load animation, favicon, and metadata. The loader must fail open and respect reduced motion.
- Preserve working contact destinations, saved cart/favorites persistence keys, keyboard navigation, search, dialogs, and responsive commerce interactions.
- The generated `public/images/brand/pospoint-hero.webp` remains an optional campaign asset. `pospoint-retail.webp` appears in the company introduction as a conceptual retail interior. The homepage keeps its original carousel and image compositions through the recolored `hero1-pospoint.webp` and `hero2-pospoint.webp` variants.
- Do not introduce green/lime brand accents, a static replacement hero, invented contacts, or unsupported business claims.

## Sources

- Tokens and shared styles: `src/app/globals.css`, `src/app/pospoint.css`, `src/app/brand-components.css`
- Components: `src/components/ui`, `src/components/layout`, `src/components/sections`
- Brand assets: `public/brand`, `public/logo.svg`, `logo.svg`
- Photography: `public/images`
- Copy and category data: `src/data/site.ts`, `src/data/about.ts`, `src/data/categories.ts`
