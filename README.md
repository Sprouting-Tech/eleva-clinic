# Eleva Clinic — Showcase (Mock Data, Next.js + Tailwind v4 + TypeScript)

A front-end showcase project that uses **100% mock data** (no backend).  
Stack: **Next.js (App Router) + TypeScript + Tailwind v4 + Swiper**.

> Goal: let FE interns build pages, sliders (Swiper), and accordions that match the design, then deploy easily to Vercel.

---

## Table of Contents

- [Requirements](#requirements)
- [Quick Start](#quick-start)
- [NPM Scripts](#npm-scripts)
- [Project Structure](#project-structure)
- [Add Mock Data](#add-mock-data)
- [Image Export & Naming Guide](#image-export--naming-guide)
- [Swiper Wrapper Usage](#swiper-wrapper-usage)
- [Accordion Usage](#accordion-usage)
- [Roadmap](#roadmap)
- [Contributing / Git Workflow](#contributing--git-workflow)
- [Appendix: Supporting Configs](#appendix-supporting-configs)

---

## Requirements

- **Node.js 18+** (recommended 20.x)
- **npm** (bundled with Node)
- VS Code + Extensions: **ESLint**, **Prettier**, **Tailwind CSS IntelliSense**, **EditorConfig**

---

## Quick Start

```bash
# 1) Create the project (if you don't have one yet)
npx create-next-app@latest eleva-clinic --typescript --eslint --src-dir --app --import-alias "@/*"
cd eleva-clinic

# 2) Install Tailwind v4 + Swiper
npm i -D tailwindcss @tailwindcss/postcss
npm i swiper
```

Create **`postcss.config.mjs`** at the repo root:

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

Add styles/tokens to **`src/app/globals.css`**:

```css
@import "tailwindcss";
@import "swiper/css";

/* Tailwind v4 tokens via @theme */
@theme {
  --color-brand-500: #e78f6d;
  --color-brand-600: #d6785a;
  --color-sand-50: #faf6f4;
  --color-sand-100: #f5eeeb;

  --radius-xl: 1rem;
  --radius-2xl: 1.25rem;
  --shadow-soft: 0 10px 25px -10px rgb(0 0 0 / 0.15);
}

body {
  background: var(--color-sand-50);
  color: rgb(23 23 23);
}

/* helpers */
.container-narrow {
  inline-size: min(100%, 768px);
  margin-inline: auto;
  padding-inline: 1rem;
}
.card {
  border-radius: var(--radius-2xl);
  background: #fff;
  box-shadow: var(--shadow-soft);
}
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-xl);
  padding: 0.5rem 1rem;
  font-weight: 500;
}
.btn-primary {
  background: var(--color-brand-500);
  color: #fff;
}
```

Run:

```bash
npm run dev
```

---

## NPM Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write .",
    "typecheck": "tsc --noEmit"
  }
}
```

---

## Project Structure

```txt
src/
  app/
    layout.tsx
    page.tsx                # Home
    services/page.tsx
    doctors/page.tsx
    reviews/page.tsx
    about/page.tsx
    contact/page.tsx
    booking/page.tsx
    services/[slug]/page.tsx        # (optional)
    doctors/[slug]/page.tsx         # (optional)
  components/
    navbar.tsx
    footer.tsx
    slider/Slider.tsx               # Swiper wrapper
    accordion/Accordion.tsx
    cards/PromoCard.tsx
    cards/ServiceCard.tsx
    cards/DoctorCard.tsx
    cards/TestimonialCard.tsx
    MapEmbed.tsx
  data/
    promotions.ts
    services.ts
    doctors.ts
    reviews.ts
    faqs.ts
  types/
    content.ts
public/
  images/...
```

---

## Add Mock Data

**Types — `src/types/content.ts`**

```ts
export type Service = {
  id: string;
  slug: string;
  name: string;
  summary?: string;
  price?: number;
  image: string;
  featured?: boolean;
  promo?: boolean;
};
export type Doctor = {
  id: string;
  slug: string;
  name: string;
  title?: string;
  image: string;
};
export type Review = {
  id: string;
  name: string;
  rating: number;
  text: string;
  image?: string;
};
export type Promotion = {
  id: string;
  title: string;
  image: string;
  cta?: string;
  href?: string;
};
export type FAQ = { id: string; q: string; a: string };
```

**Services — `src/data/services.ts`**

```ts
import { Service } from "@/types/content";

export const services: Service[] = [
  {
    id: "srv-1",
    slug: "ultraformer-iii",
    name: "ULTRAFORMER III",
    summary: "Non-surgical face/neck lifting",
    price: 9800,
    image: "/images/services/ultraformer.jpg",
    featured: true,
    promo: true,
  },
  {
    id: "srv-2",
    slug: "pico-laser",
    name: "Pico Laser",
    summary: "Dark spots & acne scars",
    price: 3500,
    image: "/images/services/pico.jpg",
    featured: true,
  },
  // ...
];
```

**Doctors — `src/data/doctors.ts`**

```ts
import { Doctor } from "@/types/content";

export const doctors: Doctor[] = [
  {
    id: "doc-1",
    slug: "dr-ploy",
    name: "Dr. Ploy",
    title: "Aesthetic Physician",
    image: "/images/doctors/ploy.jpg",
  },
  {
    id: "doc-2",
    slug: "dr-pee",
    name: "Dr. Pee",
    title: "Dermatologist",
    image: "/images/doctors/pee.jpg",
  },
];
```

**Reviews — `src/data/reviews.ts`**

```ts
import { Review } from "@/types/content";
export const reviews: Review[] = [
  {
    id: "rv-1",
    name: "Mei",
    rating: 5,
    text: "Great results and quick.",
    image: "/images/reviews/mei.jpg",
  },
  {
    id: "rv-2",
    name: "Anan",
    rating: 5,
    text: "Super friendly staff.",
    image: "/images/reviews/anan.jpg",
  },
];
```

**Promotions — `src/data/promotions.ts`**

```ts
import { Promotion } from "@/types/content";
export const promotions: Promotion[] = [
  {
    id: "pr-1",
    title: "400 Shots only 9,800 THB",
    image: "/images/promotions/uf3-400shot.jpg",
    cta: "Book Now",
    href: "/booking",
  },
];
```

**FAQs — `src/data/faqs.ts`**

```ts
import { FAQ } from "@/types/content";
export const faqs: FAQ[] = [
  {
    id: "f1",
    q: "How should I care for my skin after treatment?",
    a: "Avoid strong sunlight for 24 hours and use sunscreen.",
  },
  {
    id: "f2",
    q: "How long does it take?",
    a: "Usually 30–60 minutes depending on the service.",
  },
];
```

> Use named imports, e.g. `import { services } from "@/data/services";`, then map into cards/slides.

---

## Image Export & Naming Guide

- **Folder:** `public/images/<section>/<slug>.jpg`, e.g., `public/images/services/ultraformer.jpg`
- **Naming:** kebab-case (lowercase with dashes), no spaces/diacritics
- **Sizes:**
  - Hero/large content: ~1600px width
  - Card/slide images: ~800–1200px width
- **Formats:** JPG/PNG (WebP also fine)
- **In code:** always use `next/image` to reduce layout shift and help with sizing

```tsx
import Image from "next/image";
<Image
  src="/images/services/ultraformer.jpg"
  alt="ULTRAFORMER III"
  width={1200}
  height={800}
  className="w-full h-auto object-cover"
/>;
```

---

## Swiper Wrapper Usage

Add to **`src/app/globals.css`**:

```css
@import "swiper/css";
```

Use **`src/components/slider/Slider.tsx`**:

```tsx
import Slider from "@/components/slider/Slider";
import ServiceCard from "@/components/cards/ServiceCard";
import { services } from "@/data/services";

export default function HomeServicesSlider() {
  return (
    <Slider
      items={services}
      renderItem={(s) => <ServiceCard item={s} />}
      perView={1}
      breakpoints={{ 768: { slidesPerView: 2 } }}
      loop
    />
  );
}
```

> **Home:** Promotions / Services / Testimonials = Swiper  
> **Reviews:** two Swiper blocks  
> **About:** Meet Our Doctors = Swiper

---

## Accordion Usage

Use **`src/components/accordion/Accordion.tsx`**:

```tsx
import Accordion from "@/components/accordion/Accordion";
import { faqs } from "@/data/faqs";

export default function FAQs() {
  return <Accordion items={faqs} singleOpen />;
}
```

> **Home** and **About** reuse the same component.

---

## Roadmap

- [ ] `/services/[slug]` — service detail from mock
- [ ] `/doctors/[slug]` — doctor profile (optional)
- [ ] Booking — simple calendar grid (pick a day)
- [ ] i18n TH/EN (optional)
- [ ] Expand `@theme` tokens for full palette

---

## Contributing / Git Workflow

See **[CONTRIBUTING.md](./CONTRIBUTING.md)** for the up-to-date workflow, branch naming, commit convention, local checks, and merge rules.  
Pull requests automatically use **[.github/pull_request_template.md](./.github/pull_request_template.md)**.

### Quick Reference

- **Branch:** `feature/<area>-<short>` (e.g., `feature/home-promotions`)
- **Commits:** Conventional (e.g., `feat: home promotions slider`)
- **Local checks before PR:**
  ```bash
  npm run typecheck && npm run lint && npm run build
  ```
- **Reviewer:** assign **FULL**; merge when local build passes and there are no console errors.

---

## Appendix: Supporting Configs

**`postcss.config.mjs`**

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

**`.editorconfig`**

```
root = true
[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true
```

**`.prettierrc`**

```json
{ "semi": true, "singleQuote": false, "trailingComma": "all" }
```

**`.eslintrc.json`**

```json
{
  "extends": ["next/core-web-vitals", "eslint:recommended"],
  "rules": {
    "no-unused-vars": "warn",
    "no-console": ["warn", { "allow": ["warn", "error"] }]
  }
}
```
