import { Service } from "@/types/content";

export const services: Service[] = [
  // ⭐ Six featured (will appear in Home slider)
  {
    id: "srv-1",
    slug: "ultraformer-iii",
    name: "ULTRAFORMER III",
    summary: "ยกกระชับใบหน้าและลำคอ",
    price: 9800,
    image: "/images/services/ultraformer.jpg",
    featured: true,
  },
  {
    id: "srv-2",
    slug: "pico",
    name: "Pico Laser",
    summary: "รอยสิว/จุดด่างดำ",
    price: 3500,
    image: "/images/services/pico.jpg",
    featured: true,
  },
  {
    id: "srv-3",
    slug: "hifu",
    name: "HIFU Lifting",
    summary: "ยกกระชับ ปรับรูปหน้า",
    price: 6900,
    image: "/images/services/hifu.jpg",
    featured: true,
  },
  {
    id: "srv-4",
    slug: "botox",
    name: "Botox",
    summary: "ลดริ้วรอย/กราม",
    price: 5900,
    image: "/images/services/botox.jpg",
    featured: true,
  },
  {
    id: "srv-5",
    slug: "filler",
    name: "Filler",
    summary: "เติมเต็มใบหน้าอย่างเป็นธรรมชาติ",
    price: 12000,
    image: "/images/services/filler.jpg",
    featured: true,
  },
  {
    id: "srv-6",
    slug: "brightening",
    name: "Brightening Treatment",
    summary: "ผิวกระจ่างใส สุขภาพดี",
    price: 2500,
    image: "/images/services/brightening.jpg",
    featured: true,
  },

  // 👇 Any others won’t show on Home slider (not featured)
  {
    id: "srv-7",
    slug: "acne-care",
    name: "Acne Care",
    summary: "ควบคุมสิวและลดการอักเสบ",
    price: 1800,
    image: "/images/services/acne.jpg",
    featured: false,
  },
  // ...
];
