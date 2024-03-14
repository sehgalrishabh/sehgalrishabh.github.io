import type { Metadata } from "next";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import DotGrid from "@/components/DotGrid";
config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Rishabh Sehgal",
  description: "Mobile Application Expert",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-kode">
        {typeof window !== "undefined" && <DotGrid />}
        {children}
      </body>
    </html>
  );
}
