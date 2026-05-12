"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="relative flex h-[95vh] min-h-[700px] w-full items-center justify-center overflow-hidden pb-10 pt-20">
      <div className="absolute inset-0 bg-secondary/20 backdrop-blur-[4px]"></div>
      <div className="pointer-events-none absolute left-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-primary/30 blur-[120px] mix-blend-screen"></div>
      <div className="pointer-events-none absolute bottom-[10%] right-[20%] h-[500px] w-[500px] rounded-full bg-accent/20 blur-[150px] mix-blend-screen"></div>

      <div className="relative z-10 mx-auto flex h-full w-[92%] max-w-[1400px] flex-col items-center gap-10 md:flex-row">
        <div className="flex w-full flex-col items-start justify-center md:w-[60%]">
          <div className="glass-panel-dark group relative overflow-hidden rounded-[2.5rem] border border-white/20 p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] backdrop-blur-xl md:p-14">
            <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>

            <div className="mb-6 flex items-center gap-4">
              <div className="h-[2px] w-12 bg-accent"></div>
              <span className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-accent md:text-sm">
                The Alchemy Co.
              </span>
            </div>

            <h1 className="mb-6 font-serif text-[42px] font-bold leading-[1.1] text-white md:text-[76px] md:leading-[1.05]">
              ROASTED FOR <br />
              <span className="bg-gradient-to-r from-white via-white/80 to-accent bg-clip-text font-light italic text-transparent">
                PERFECTION.
              </span>
            </h1>

            <p className="mb-10 max-w-[500px] font-sans text-base font-light leading-relaxed text-white/70 md:text-lg">
              Discover the art of specialty coffee. Sourced from the finest estates, crafted with intention, and designed to elevate your everyday ritual into an immersive experience.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <button
                onClick={() => router.push("/products")}
                className="relative flex items-center gap-3 overflow-hidden rounded-full bg-white px-8 py-4 font-sans text-sm font-semibold tracking-widest text-secondary shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-transform hover:scale-105"
              >
                <span>SHOP ROASTS</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => router.push("/our-story")}
                className="group flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:text-accent"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 backdrop-blur-md transition-all group-hover:border-accent group-hover:bg-white/5">
                  <Play className="ml-1 h-4 w-4 fill-current" />
                </div>
                <span>Our Story</span>
              </button>
            </div>
          </div>
        </div>

        <div className="perspective-1000 relative hidden h-full w-full items-center justify-center md:flex md:w-[40%]">
          <div className="glass-panel absolute flex h-[480px] w-[340px] animate-[float_6s_ease-in-out_infinite] flex-col items-center rounded-[3rem] border border-white/20 bg-white/5 p-8 shadow-2xl backdrop-blur-lg">
            <div className="group relative mb-6 aspect-square w-full">
              <Image
                src="/coffee1.png"
                alt="Noire Ritual"
                fill
                className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            <div className="w-full border-t border-white/20 pt-6">
              <p className="mb-1 font-serif text-2xl font-bold text-white">Noire Ritual</p>
              <p className="mb-4 font-sans text-xs uppercase tracking-[0.2em] text-accent">70 Arabica : 30 Robusta</p>
              <div className="flex items-center justify-between">
                <span className="font-sans text-sm text-white/80">Crisp Apples • Baking Spices • Milk Chocolate</span>
                <button
                  onClick={() => router.push("/products")}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-colors hover:bg-white/20"
                >
                  <ArrowRight className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>
          </div>

          <div className="glass-panel absolute -right-4 top-[15%] -z-10 flex h-[380px] w-[280px] animate-[float_8s_ease-in-out_infinite_reverse] flex-col items-center rounded-[2.5rem] border border-white/10 bg-black/20 p-6 shadow-xl backdrop-blur-md">
            <div className="relative mb-4 aspect-square w-4/5">
              <Image
                src="/whole-beans-bag.jpg"
                alt="Velvet Roast"
                fill
                className="object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.4)]"
              />
            </div>
            <div className="mt-auto w-full text-center">
              <p className="font-serif text-lg font-bold text-white/90">Velvet Roast</p>
              <p className="font-sans text-[10px] uppercase tracking-widest text-accent mb-2">80% Arabica : 20% Robusta</p>
              <p className="font-sans text-[10px] text-white/70 leading-tight">Chocolate • Caramel • Roasted Nuts</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
