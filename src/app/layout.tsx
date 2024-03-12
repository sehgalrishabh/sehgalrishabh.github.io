import type { Metadata } from "next";
import "./globals.css";

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
      <body className="font-kode">{children}</body>
    </html>
  );
}
