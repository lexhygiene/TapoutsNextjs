import type { Metadata } from "next";
import { Inter, Outfit, Anton } from "next/font/google"; // Using Outfit as brand font replacement or similar
import Script from "next/script";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SidebarForm from "../components/SidebarForm";
import Schema from "../components/Schema";



// Load fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: 'swap' });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: 'swap' });
const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://tapouts.co'),
  title: "Tapouts | Smart Maintenance",
  description: "Smart Maintenance. Unified Approach. Exponential Results.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${anton.variable}`}>
      <head>
        <link rel="preconnect" href="https://grainy-gradients.vercel.app" />
      </head>
      <body className="font-sans antialiased text-gray-800 bg-white min-h-screen flex flex-col">
        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer */}
        <Footer />

        {/* Global Widgets */}
        <SidebarForm />
        <Schema />

        {/* GoHighLevel Chat Widget */}
        <Script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="692b98d48fcc751d52c8c8de"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
