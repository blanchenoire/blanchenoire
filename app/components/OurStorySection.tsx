"use client"
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OurStorySection() {
  const router = useRouter();

  return (
    <section className="px-[6%] py-20 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

      {/* LEFT CONTENT */}
      <div>
        <p className="uppercase text-xs md:text-sm tracking-widest mb-4 md:mb-6">
          Our Story
        </p>

        <h2 className="text-[36px] leading-[1.1] md:text-[72px] md:leading-[1.05] font-medium mb-6 md:mb-8">
          THE SPECIALTY <br /> JOURNEY
        </h2>

        <p className="text-gray-600 max-w-[480px] text-sm md:text-lg mb-8 md:mb-10">
          This is the space to introduce the business and what it has to offer.
          Define the qualities and values that make it unique.
        </p>

        <button
          className="flex items-center gap-3 border-b border-black pb-1 text-sm md:text-lg"
        >
          CONTACT US
          <ArrowRight size={18} />
        </button>
      </div>

      {/* RIGHT IMAGES */}
      <div className="relative flex justify-center">

        {/* background leaf (smaller on mobile) */}
        <div className="absolute bottom-0 left-4 md:left-6 w-[180px] h-[180px] md:w-[320px] md:h-[320px] rounded-3xl overflow-hidden">
          <Image
            src="/big-leaf.png"
            alt="leaf"
            fill
            className="object-cover"
          />
        </div>

        {/* main image */}
        <div className="relative z-10 w-[240px] h-[280px] md:w-[380px] md:h-[420px] rounded-3xl overflow-hidden shadow-lg">
          <Image
            src="/team.png"
            alt="coffee team"
            fill
            className="object-cover"
          />
        </div>

      </div>
    </section>
  );
}