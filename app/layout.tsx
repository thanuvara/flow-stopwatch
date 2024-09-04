import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flow Stopwatch",
  description: "Flow Stopwatch Challenge by Thanu Varatharajan",
  icons: {
    icon: "https://flowengineering.com/favicons/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="https://flowengineering.com/favicons/favicon.ico"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
