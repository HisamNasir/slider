import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Lato({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className=" bg-gray-800">
      <body className={inter.className}>
        <Providers>
          <div className=" relative">
            <nav className="absolute text-center w-full z-10 h-14 bg-slate-900 text-white ">
              <h1 className=" flex h-full justify-center items-center font-extrabold tracking-widest text-xl">
                Store
              </h1>
            </nav>
            <div className="pt-20">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
