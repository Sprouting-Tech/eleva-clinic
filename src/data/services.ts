import { Service } from "@/types/content";

export const services: Service[] = [
  {
    id: "srv-1",
    slug: "ultraformer-iii",
    name: "ULTRAFORMER III",
    summary: "ยกกระชับใบหน้าและลำคอ",
    price: 9800,
    image: "/images/placeholder.jpg",
    featured: true,
    promo: true,
  },
  {
    id: "srv-2",
    slug: "pico",
    name: "Pico Laser",
    summary: "รอยสิว/จุดด่างดำ",
    price: 3500,
    image: "/images/placeholder.jpg",
    featured: true,
  },
  // ...
];
