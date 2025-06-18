import { Inter } from "next/font/google";
import localFont from "next/font/local";

import Footer from "@/src/components/global/Footer";
import "@/src/styles/tailwind.css";
import Header from "@/src/components/global/Header";
import Aside from "@/src/components/global/Aside";

const inter = Inter({
  subsets: ["latin"],
});

const melody = localFont({
  src: [
    {
      path: "../src/fonts/BLMelody-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../src/fonts/BLMelody-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../src/fonts/BLMelody-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={(melody.className, inter.className)}>
      <head>
        <title>Fillout - Page navigation</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={"max-lg:flex max-lg:min-h-screen max-lg:flex-col"}>
        <div className="grid min-h-screen w-screen grid-cols-[20rem_1fr] grid-rows-[auto_1fr_auto] overflow-hidden max-lg:min-h-auto max-lg:flex-1 max-lg:grid-cols-1">
          <Header className={"col-span-2"} />
          <Aside />
          <main className={"w-full overflow-hidden"}>{children}</main>
        </div>

        <Footer className={"col-span-2"} />
      </body>
    </html>
  );
}
