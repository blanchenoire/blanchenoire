"use client"
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SpecialtyCoffee() {
  const router = useRouter()

  return (
    <>
      <section className="px-[6%] py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

        <div>
          <h2 className="text-[36px] leading-[40px] md:text-[70px] md:leading-[75px] mb-6 md:mb-10 font-medium">
            SPECIALTY
            <br />
            COFFEE
            <br />
            CURATIONS
          </h2>

          <p className="text-gray-600 max-w-[420px] mb-6 md:mb-8 text-sm md:text-base">
            This space is for those who truly appreciate coffee, not just as a routine, but as an experience. From carefully sourced beans to thoughtfully crafted blends, every detail is curated to bring out depth, character, and consistency in every cup. Whether you prefer bold and strong or smooth and balanced, our selections are designed to elevate your everyday coffee ritual.
          </p>

          <button className="flex items-center gap-3 border-b pb-1">
            DISCOVER MORE
          </button>

          <div className="mt-10 md:mt-16">
            <Image
              alt="Coffee image"
              src="/coffee-drink.png"
              width={160}
              height={160}
              className="rounded-2xl"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <Image
            alt="Coffee image"
            className="rounded-[30px] md:rounded-[40px] w-full max-w-[500px]"
            src="/coffee-drink.png"
            width={650}
            height={450}
          />
        </div>
      </section>

      {/* VIDEO SECTION */}
      
    </>
  );
}