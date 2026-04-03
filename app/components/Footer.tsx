"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="px-[4%] pb-10">
      {/* <div className="bg-[#D8D4BC] rounded-[30px] md:rounded-[40px] p-8 md:p-16"> */}
      <div className="bg-[#D8D4BC] rounded-[30px] md:rounded-[40px] p-8 md:p-16">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 md:gap-16">

          {/* LOGO */}
          <div className="flex flex-col text-white gap-6 items-center md:items-start">
            <Image
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              src="/final-logo.png"
              alt="logo"
              width={200}
              height={120}
              className="cursor-pointer"
            />
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-semibold mb-4 text-center md:text-left">CONTACT</h4>
            <ul className="space-y-2 text-sm text-center md:text-left">
              <li>Info@mysite.com</li>
              <li>Tel: 123-456-7890</li>
              <li>address line 1</li>
              <li>address line 2</li>
              <li>Monday–Friday</li>
              <li>9:00am – 7:00pm</li>
            </ul>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="font-semibold mb-4 text-center md:text-left">QUICK LINKS</h4>
            <ul className="space-y-2 cursor-pointer text-sm text-center md:text-left">
              <li className="hover:underline" onClick={()=>{
                router.push("/products")
              }}>Shop</li>
              {/* <li>Wholesale</li> */}
            </ul>
          </div>

          {/* POLICY */}
          <div>
            <h4 className="font-semibold mb-4 text-center md:text-left">POLICY</h4>
            <ul className="space-y-2 text-sm text-center md:text-left">
              <li className="cursor-pointer hover:underline" onClick={()=>{router.push("/terms-conditions")}}>Terms & Conditions</li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h4 className="font-semibold mb-4 text-center md:text-left">FOLLOW</h4>
            <ul className="space-y-2 text-sm text-center md:text-left">
              {/* <li>Facebook</li> */}
              <Link href={"https://www.instagram.com/blanchenoirecoffee/"}><li className="hover:underline cursor-pointer">Instagram</li></Link>
            </ul>
          </div>

        </div>

        {/* NEWSLETTER */}
        <div className="mt-12 md:mt-14 flex flex-col items-center text-center">

          <p className="font-semibold mb-4">STAY CONNECTED</p>

          <div className="flex flex-col md:flex-row gap-4 w-full max-w-[900px]">

            <input
              type="email"
              placeholder="ENTER EMAIL"
              className="w-full rounded-full border border-[#2b4635] px-6 py-3 bg-transparent outline-none text-sm md:text-base"
            />

            <button className="w-full md:w-auto bg-[#0E3B34] text-white px-10 py-3 rounded-full">
              Submit
            </button>

          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="mt-10 md:mt-12 text-xs md:text-sm text-center md:text-left">
          © 2026 by The Blanche Noire.
        </div>

      </div>
    </footer>
  );
}