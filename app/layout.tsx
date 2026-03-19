import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Recipes",
  description: "A collection of recipes powered by Next.js and Sanity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased bg-zinc-50 text-zinc-900`}>
        <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-zinc-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
            <a href="/" className="text-lg font-semibold tracking-tight text-zinc-900 hover:text-amber-600 transition-colors">
              Recipes
            </a>
            <a
              href="https://mikesabo.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-400 hover:text-zinc-700 transition-colors"
            >
              mikesabo.dev
            </a>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
