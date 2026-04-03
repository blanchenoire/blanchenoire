import Image from "next/image";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductShowcase from "./components/ProductShowcase";
import SpecialtyCoffee from "./components/SpecialityCoffee";
import SustainabilitySection from "./components/SustainabilitySection";
import ProductGrid from "./components/ProductGrid";
import CoffeeAccordion from "./components/CoffeeAccordion";
import OurStorySection from "./components/OurStorySection";
import Footer from "./components/Footer";
import CategorySlider from "./components/CategorySlider";

export default function Home() {
  return (
    <div>
      <main className="bg-[#F4F4F4] min-h-screen">
        <Navbar/>
        <Hero/>
        {/* <ProductShowcase/> */}
        <SpecialtyCoffee/>
        <SustainabilitySection/>
        <ProductGrid/>
        {/* <CoffeeAccordion/> */}
        <CategorySlider/>
        <OurStorySection/>
        <Footer/>
      </main>
    </div>
  );
}
