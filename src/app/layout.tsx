import type { Metadata } from "next";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Cursor from "@/components/Cursor";
config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Rishabh Sehgal — Mobile Application Expert",
  description:
    "Senior Mobile Application Developer specialising in React Native, Flutter, and cross-platform apps. 5+ years building products used by millions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-kode">
        <Cursor />
        {children}
      </body>
    </html>
  );
}
