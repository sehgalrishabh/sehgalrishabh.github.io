"use client";
import type { Metadata } from "next";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

// export const metadata: Metadata = {
//   title: "Rishabh Sehgal",
//   description: "Mobile Application Expert",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-kode">
        <span
          className="dummy"
          onMouseMove={(e) => {
            let rect = e.target.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;
            e.currentTarget.style.setProperty("--x", x + "px");
            e.currentTarget.style.setProperty("--y", y + "px");
          }}
        />
        {children}
      </body>
    </html>
  );
}
