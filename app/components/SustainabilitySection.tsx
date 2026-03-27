import Image from "next/image";

export default function SustainabilitySection() {
  return (
    <div>
      
      {/* <section className="relative w-full bg-[#714236] py-20 md:py-40 overflow-hidden"> */}
      <section className="relative w-full bg-[#D8D4BC] py-20 md:py-40 overflow-hidden">

        {/* LEFT IMAGE GROUP (HIDDEN ON MOBILE) */}
        <div className="hidden md:block absolute left-28 top-24">
          <div className="relative w-[220px] h-[160px] rounded-3xl overflow-hidden">
            <Image src="/coffee-beans.png" alt="coffee plant" fill className="object-cover" />
          </div>

          <div className="absolute -left-16 top-28 w-[200px] h-[140px] rounded-3xl overflow-hidden">
            <Image src="/wood.png" alt="wood texture" fill className="object-cover" />
          </div>
        </div>

        {/* RIGHT IMAGE GROUP (HIDDEN ON MOBILE) */}
        <div className="hidden md:block absolute right-28 top-40">
          <div className="relative w-[260px] h-[180px] rounded-3xl overflow-hidden">
            <Image src="/coffee-cup.png" alt="coffee" fill className="object-cover" />
          </div>

          <div className="absolute -right-12 top-28 w-[220px] h-[150px] rounded-3xl overflow-hidden">
            <Image src="/leaf.png" alt="leaf" fill className="object-cover" />
          </div>
        </div>

        {/* CENTER TEXT */}
        <div className="max-w-[820px] mx-auto text-center px-4 md:px-6">
          <p className="text-[22px] leading-[32px] md:text-[38px] md:leading-[54px] font-medium text-black">
            Our coffee, team, farmers and planet are at our core. Each cup
            reflects our commitment to quality and sustainability.
          </p>
        </div>

      </section>

      {/* BOTTOM STRIP */}
      <div className="w-full bg-[#0F2F23] py-4 md:py-6 flex flex-wrap justify-center gap-6 md:gap-16 text-[#CFE7C4] text-sm md:text-lg tracking-wide">
        <span>✺ 100% ORGANIC</span>
        <span>✺ 100% ORGANIC</span>
        <span>✺ 100% ORGANIC</span>
        <span className="hidden md:inline">✺ 100% ORGANIC</span>
        <span className="hidden md:inline">✺ 100% ORGANIC</span>
      </div>
      <div className="w-full">
        <video
          className="w-full h-[300px] sm:h-[350px] md:h-[800px] object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="https://res.cloudinary.com/dsifc5jc2/video/upload/v1774601461/WhatsApp_Video_2026-03-25_at_15.36.58_ei5btg.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="w-full bg-[#0F2F23] py-4 md:py-6 flex flex-wrap justify-center gap-6 md:gap-16 text-[#CFE7C4] text-sm md:text-lg tracking-wide">
        <span>✺ 100% ORGANIC</span>
        <span>✺ 100% ORGANIC</span>
        <span>✺ 100% ORGANIC</span>
        <span className="hidden md:inline">✺ 100% ORGANIC</span>
        <span className="hidden md:inline">✺ 100% ORGANIC</span>
      </div>
    </div>
  );
}