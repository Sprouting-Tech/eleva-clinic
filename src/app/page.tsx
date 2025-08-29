
// app/page.tsx
"use client";
import Hero from "@/components/Hero";
import Slider from "@/components/slider/Slider";
import ServiceCard from "@/components/cards/ServiceCard";
import { services } from "@/data/services";
import HomeSections from "@/components/home/HomeSections";

export default function Home() {
  return (
    <>
      <Hero /> 
      <HomeSections />
      
     
    </>
  );
}



