"use client";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  return (
    <section
      className="w-full h-[80vh] mt-4 bg-cover relative bg-center flex items-center px-[6%]"
      style={{ backgroundImage: "url('/d.jpeg')" }}
    >
      {/* Overlay (optional for better readability) */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-6">
        <h1 className="text-white text-[36px] leading-[42px] md:text-[72px] md:leading-[80px] font-medium max-w-[900px]">
          100% ORGANIC COFFEE,
          <br />
          CRAFTED FOR COFFEE LOVERS
        </h1>

        <button
          onClick={() => router.push("/products")}
          className="bg-white text-black px-6 md:px-8 py-2.5 md:py-3 rounded-full text-sm font-medium"
        >
          SHOP NOW
        </button>
      </div>
    </section>
  );
}