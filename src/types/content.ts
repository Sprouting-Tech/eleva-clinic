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
