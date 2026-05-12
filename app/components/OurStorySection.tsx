"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OurStorySection() {
  const router = useRouter();

  return (
    <section className="relative w-full overflow-hidden px-[4%] py-24 md:px-[6%] md:py-32">
      <div className="absolute inset-0 bg-secondary/30 backdrop-blur-[2px]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-black/40"></div>
      </div>

      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-serif text-[180px] font-bold leading-none text-white opacity-[0.02] md:text-[300px]">
        ALCHEMY
      </div>

      <div className="relative z-10 grid grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-24">
        <div className="relative mx-auto max-w-[540px] md:mx-0">
          <div className="glass-panel-dark group relative overflow-hidden rounded-[2.5rem] border border-white/10 p-8 shadow-2xl backdrop-blur-2xl md:p-12">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50"></div>

            <div className="relative z-10 mb-6 flex items-center gap-3">
              <div className="h-px w-8 bg-accent"></div>
              <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-accent">Our Origins</span>
            </div>

            <h2 className="relative z-10 mb-8 font-serif text-[42px] font-bold leading-[1.1] text-white md:text-[56px] md:leading-[1.05]">
              THE ALCHEMY <br />
              <span className="bg-gradient-to-r from-accent to-white bg-clip-text font-light italic text-transparent">OF COFFEE</span>
            </h2>

            <p className="relative z-10 mb-6 font-light leading-relaxed text-white/70 md:text-lg">
              Blanche Noire is built on a simple idea: great coffee begins at the source. Our beans are carefully sourced from renowned regions like Chikmagalur, Coorg, and the Araku Valley, where rich soil and ideal climates shape their distinct character.
            </p>

            <p className="relative z-10 mb-10 font-light leading-relaxed text-white/70 md:text-lg">
              We work closely with growers to craft blends that balance boldness, smoothness, and depth. Inspired by the origins of coffee and the story behind it, every cup reflects both tradition and modern taste.
            </p>

            <button
              onClick={() => router.push("/our-story")}
              className="group relative z-10 flex w-max items-center gap-3 border-b border-white/30 pb-2 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:border-accent hover:text-accent"
            >
              FOLLOW THE GOAT
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        <div className="perspective-1000 relative flex justify-center md:justify-end">
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[100px] mix-blend-screen"></div>

          <div className="group relative aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <Image
              src="/berriesOurStory.png"
              alt="Coffee Origins"
              fill
              className="object-cover transition-transform duration-[15s] ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent opacity-80"></div>
          </div>

          <div className="absolute -bottom-10 -left-6 z-20 h-[180px] w-[180px] animate-[float_8s_ease-in-out_infinite_reverse] overflow-hidden rounded-full border border-white/20 shadow-2xl md:-left-12 md:bottom-12 md:h-[220px] md:w-[220px]">
            <Image src="/big-leaf.png" alt="Botanical" fill className="object-cover" />
            <div className="absolute inset-0 bg-secondary/10 backdrop-blur-[1px]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
