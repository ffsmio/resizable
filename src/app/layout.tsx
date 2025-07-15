import "./globals.css";
import { Inter } from "next/font/google";
import { PropsWithChildren } from "react";
import { cn } from "@/lib/cn";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  preload: true,
});

export default function RootLayout(props: PropsWithChildren) {
  const { children } = props;
  return (
    <html lang="en">
      <body
        className={cn(inter.className, inter.variable, "antialiased")}
      >
        {children}
      </body>
    </html>
  );
}
