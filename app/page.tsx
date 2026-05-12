import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SpecialtyCoffee from "./components/SpecialityCoffee";
import SustainabilitySection from "./components/SustainabilitySection";
import ProductGrid from "./components/ProductGrid";
import OurStorySection from "./components/OurStorySection";
import Footer from "./components/Footer";
import CategorySlider from "./components/CategorySlider";
import BrewingGuides from "./components/BrewingGuides";


export default function Home() {
  return (
    <div className="relative min-h-screen">
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat grayscale-[0.2] brightness-[0.4]"
        style={{ backgroundImage: "url('/d.jpeg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/80 via-secondary/40 to-black"></div>
      </div>

      <main className="relative z-10 min-h-screen overflow-hidden text-[#f8efe5]">
        <Navbar/>
        <Hero/>
        <SpecialtyCoffee/>
        <SustainabilitySection/>
        <ProductGrid/>
        <BrewingGuides/>
        <CategorySlider/>
        <OurStorySection/>
        <Footer/>
      </main>
    </div>
  );
}
