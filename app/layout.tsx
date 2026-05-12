import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blanche noire",
  description: "Coffee specially crafted for coffee lovers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
