"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="px-[2%] pb-8 pt-8 md:px-[3%]">
      <div className="relative overflow-hidden rounded-[2rem] bg-secondary p-10 text-white md:p-20">
        <div className="pointer-events-none absolute right-0 top-0 h-full w-full opacity-[0.02]">
          <div className="absolute right-[-10%] top-[-20%] h-[150%] w-[80%] rounded-full border border-white"></div>
        </div>

        <div className="relative z-10 grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-12 md:gap-8">
          <div className="flex flex-col items-center text-center md:col-span-4 md:items-start md:text-left">
            <div
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="mb-6 cursor-pointer"
            >
              <Image
                src="/final-logo.png"
                alt="Blanche Noire"
                width={160}
                height={80}
                className="mb-4 brightness-0 invert"
              />
              <h3 className="mb-1 font-sans text-xl font-medium uppercase tracking-[0.2em] text-white">
                BLANCHE NOIRE <br /> COFFEE
              </h3>
              <p className="font-serif text-sm italic uppercase tracking-widest text-accent">
                An Alchemy Co.
              </p>
            </div>
            <p className="max-w-[280px] text-sm font-light text-white/60">
              Crafted for those who appreciate coffee not just as a routine, but as an experience.
            </p>
          </div>

          <div className="flex flex-col items-center md:col-span-3 md:items-start">
            <h4 className="mb-6 font-sans text-xs font-bold uppercase tracking-widest text-accent">CONTACT</h4>
            <ul className="space-y-4 text-center text-sm font-light text-white/80 md:text-left">
              <li><a href="mailto:info@blanchenoire.com" className="transition-colors hover:text-white">info@blanchenoire.com</a></li>
              <li><a href="tel:+1234567890" className="transition-colors hover:text-white">+1 234 567 890</a></li>
              <li className="pt-2">123 Roastery Lane</li>
              <li>Coffee District, CD 12345</li>
              <li className="pt-2 text-white/50">Mon-Fri: 9am - 7pm</li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:col-span-2 md:items-start">
            <h4 className="mb-6 font-sans text-xs font-bold uppercase tracking-widest text-accent">EXPLORE</h4>
            <ul className="space-y-4 text-center text-sm font-light text-white/80 md:text-left">
              <li><button onClick={() => router.push("/products")} className="uppercase tracking-wider transition-colors hover:text-white">Shop</button></li>
              <li><button onClick={() => router.push("/subscription")} className="uppercase tracking-wider transition-colors hover:text-white">Subscription</button></li>
              <li><button onClick={() => router.push("/our-story")} className="uppercase tracking-wider transition-colors hover:text-white">Our Story</button></li>
              <li><button onClick={() => router.push("/terms-conditions")} className="uppercase tracking-wider transition-colors hover:text-white">Terms</button></li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:col-span-3 md:items-start">
            <h4 className="mb-6 w-full text-center font-sans text-xs font-bold uppercase tracking-widest text-accent md:text-left">
              STAY CONNECTED
            </h4>
            <p className="mb-6 text-center text-sm font-light text-white/60 md:text-left">
              Join our newsletter for exclusive releases and alchemy secrets.
            </p>
            <div className="relative w-full">
              <input
                type="email"
                placeholder="YOUR EMAIL"
                className="w-full rounded-full border border-white/20 bg-white/5 px-6 py-4 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-accent"
              />
              <button className="absolute bottom-2 right-2 top-2 rounded-full bg-accent px-6 text-xs font-bold uppercase tracking-wider text-secondary transition-colors hover:bg-white">
                Join
              </button>
            </div>

            <div className="mt-8 flex gap-6">
              <Link href="https://www.instagram.com/blanchenoirecoffee/" target="_blank" className="text-sm font-medium uppercase tracking-wider text-white/60 transition-colors hover:text-white">
                Instagram
              </Link>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs font-light uppercase tracking-wider text-white/40 md:flex-row">
          <p>© {new Date().getFullYear()} BLANCHE NOIRE COFFEE. ALL RIGHTS RESERVED.</p>
          <p>FOLLOW THE GOAT.</p>
        </div>
      </div>
    </footer>
  );
}
