"use client";

import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SpecialtyCoffee() {
  const router = useRouter();

  return (
    <section className="relative w-full overflow-hidden px-[4%] py-24 md:px-[6%] md:py-32">
      <div className="absolute inset-0 bg-secondary/30 backdrop-blur-[2px]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-black/40"></div>
      </div>

      <div className="pointer-events-none absolute -left-[10%] top-[10%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px] mix-blend-screen"></div>

      <div className="relative z-10 grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5 md:col-start-2">
          <div className="glass-panel-dark group relative overflow-hidden rounded-[2.5rem] border border-white/10 p-8 shadow-2xl backdrop-blur-2xl md:p-12">
            <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] border border-white/5"></div>

            <div className="mb-6 flex items-center gap-3">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-accent">Crafted Excellence</span>
            </div>

            <h2 className="mb-8 font-serif text-[36px] font-bold leading-[1.1] tracking-tight text-white md:text-[56px] md:leading-[1.05]">
              SPECIALTY <br />
              <span className="bg-gradient-to-r from-accent to-white bg-clip-text font-light italic text-transparent">COFFEE</span> <br />
              CURATIONS
            </h2>

            <p className="mb-10 max-w-[480px] font-sans text-base font-light leading-relaxed text-white/70">
              Experience the true alchemy of coffee. Our beans are sourced from regions like Coorg and Chikmagalur, bringing a rich, complex flavor profile to your cup.
            </p>

            <button
              onClick={() => router.push("/products")}
              className="group relative flex items-center gap-3 overflow-hidden rounded-full border border-white/30 px-6 py-3 font-sans text-xs font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:bg-white hover:text-secondary"
            >
              <span>Discover More</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        <div className="group relative flex h-[500px] items-center justify-center md:col-span-5 md:col-start-8 md:h-[600px]">
          <div className="relative z-20 h-4/5 w-full">
            <Image
              src="/whole-beans-bag.jpg"
              alt="Specialty Roast"
              fill
              className="object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.6)] transition-transform duration-700 group-hover:-rotate-3 group-hover:scale-110"
            />
          </div>

          <div className="glass-panel absolute bottom-4 left-0 right-0 z-30 flex translate-y-4 items-center justify-between rounded-2xl border border-white/20 bg-white/10 p-6 opacity-0 backdrop-blur-xl transition-all delay-100 duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <div>
              <p className="font-serif text-xl italic text-white">The Alchemy</p>
              <p className="mt-1 font-sans text-xs uppercase tracking-widest text-white/60">Roasters & Blenders</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 overflow-hidden bg-white/5">
              <Image src="/final-logo.png" alt="BN Logo" width={24} height={24} className="object-contain" />
            </div>
          </div>

          <div className="absolute -z-10 h-[400px] w-[400px] rounded-full border border-white/5 bg-white/5 backdrop-blur-md transition-transform duration-1000 group-hover:scale-110"></div>
        </div>
      </div>
    </section>
  );
}
