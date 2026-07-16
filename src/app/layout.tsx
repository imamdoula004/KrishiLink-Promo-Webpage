import type { Metadata, Viewport } from "next";
import Navigation from "../components/Navigation";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#fbfaf2",
};

export const metadata: Metadata = {
  title: "KrishiLink Promotional Webpage",
  description: "An award-winning, mobile-first interactive experience showcasing KrishiLink. Connecting farmers directly with buyers, eliminating middlemen, reducing food waste, and driving prosperity across rural Bangladesh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased hide-scrollbar">
      <body className="min-h-full flex flex-col bg-[#fbfaf2] text-[#1b1c17] overflow-x-hidden">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
