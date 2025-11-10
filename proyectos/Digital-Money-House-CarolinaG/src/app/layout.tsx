import { Footer } from "@/components/layout/Footer";
import { Open_Sans } from "next/font/google";
import { Metadata } from "../../node_modules/next/types";
import "./globals.css";

const openSans = Open_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Digital Money",
  description: "A digital money app built with Next.js and Tailwind CSS",
  keywords: ["Digital Money", "Next.js", "Tailwind CSS"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body
        className={`w-full min-h-screen flex grow relative flex-col justify-between bg-dark1 text-white ${openSans.className}`}
      >
       {children}
  
   
        <Footer />
      </body>
    </html>
  );
}
