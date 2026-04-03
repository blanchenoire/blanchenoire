"use client";

import Navbar from "@/app/components/Navbar";

export default function TermsPage() {
  return (
    <div className="bg-[#f5f3ef] text-[#1c1c1a]">

      <Navbar />

      <main className="pt-24 px-4 sm:px-[6%] py-16 md:py-24">

        {/* HEADER */}
        <div className="mb-14 max-w-5xl">
          <h1 className="text-[42px] md:text-[72px] font-extrabold tracking-tight leading-tight mb-4">
            Terms & Conditions
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            These terms govern your use of Blanche Noire and our services.
          </p>
        </div>

        {/* CONTENT */}
        <div className="space-y-12 max-w-5xl text-gray-700 text-sm md:text-base leading-relaxed">

          {/* INTRO */}
          <section>
            <p>
              By accessing or using the Blanche Noire website, you agree to comply with and be bound by these Terms & Conditions.
              These terms apply to all users, including customers, browsers, and contributors.
              If you do not agree, please refrain from using our services.
            </p>
          </section>

          {/* ELIGIBILITY */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-3">
              Eligibility
            </h2>
            <p>
              You must be at least 18 years of age or have permission from a legal guardian to use this website.
              You agree to provide accurate and complete information when creating an account or placing an order.
            </p>
          </section>

          {/* PRODUCTS */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-3">
              Products & Pricing
            </h2>
            <p>
              We strive to present accurate product descriptions, images, and pricing.
              However, errors may occur. Blanche Noire reserves the right to correct inaccuracies,
              update information, or cancel orders if necessary.
            </p>
          </section>

          {/* ORDERS */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-3">
              Orders & Payments
            </h2>
            <p>
              All orders are subject to acceptance and availability.
              Payment must be completed at the time of purchase.
              We reserve the right to refuse or cancel orders at our discretion, including suspected fraudulent transactions.
            </p>
          </section>

          {/* SHIPPING */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-3">
              Shipping & Delivery
            </h2>
            <p>
              Delivery timelines are estimates and may vary based on location and external factors.
              Blanche Noire is not liable for delays caused by logistics providers or unforeseen circumstances.
            </p>
          </section>

          {/* RETURNS */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-3">
              Returns & Refunds
            </h2>
            <p>
              Returns are accepted only in cases of defective, damaged, or incorrect items.
              Requests must be submitted within a reasonable timeframe after delivery.
              Refunds are processed after inspection and approval.
            </p>
          </section>

          {/* ACCOUNT */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-3">
              User Accounts
            </h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials.
              Blanche Noire is not responsible for unauthorized access resulting from user negligence.
            </p>
          </section>

          {/* IP */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-3">
              Intellectual Property
            </h2>
            <p>
              All content on this website, including branding, images, text, and design elements,
              is the property of Blanche Noire and may not be reproduced without permission.
            </p>
          </section>

          {/* LIMITATION */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-3">
              Limitation of Liability
            </h2>
            <p>
              Blanche Noire shall not be held liable for indirect, incidental, or consequential damages
              arising from the use of our platform or products.
            </p>
          </section>

          {/* PRIVACY */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-3">
              Privacy
            </h2>
            <p>
              Your personal information is handled in accordance with our Privacy Policy.
              By using our website, you consent to the collection and use of data as described.
            </p>
          </section>

          {/* CHANGES */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-3">
              Changes to Terms
            </h2>
            <p>
              We reserve the right to update or modify these Terms at any time.
              Continued use of the website constitutes acceptance of the revised terms.
            </p>
          </section>

          {/* CONTACT */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-3">
              Contact
            </h2>
            <p>
              For any queries regarding these Terms & Conditions, please contact us at:
              <br />
              <span className="font-medium">
                curator@blanchenoire.com
              </span>
            </p>
          </section>

        </div>

      </main>

      {/* FOOTER */}
      <footer className="w-full py-10 px-4 sm:px-[6%] border-t text-sm text-gray-500">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <span>© 2026 Blanche Noire</span>
          <div className="flex gap-4">
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </footer>

    </div>
  );
}