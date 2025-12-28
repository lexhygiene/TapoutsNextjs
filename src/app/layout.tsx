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
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="-EFbi4-Y7jxWYxZpvpANHDB_ZMeQBkDQrbTaGUeuxY4" />
        <link rel="preconnect" href="https://grainy-gradients.vercel.app" />
        <link rel="preconnect" href="https://fonts.bunny.net" />
      </head>
      <body className="font-sans antialiased text-gray-800 bg-white min-h-screen flex flex-col">
        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <div className="flex-grow pt-20">
          {children}
        </div>

        {/* Sidebar Form */}
        <SidebarForm />

        {/* Footer */}
        <Footer />

        {/* Schema Markup */}
        <Schema />

        {/* Google Analytics & Ads (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-E4CXDVWGXY"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-E4CXDVWGXY');
          `}
        </Script>

        {/* GoHighLevel Chat Widget */}
        <Script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="692b98d48fcc751d52c8c8de"
          strategy="lazyOnload"
        />

        {/* GoHighLevel External Tracking */}
        <Script
          src="https://links.tapouts.co/js/external-tracking.js"
          data-tracking-id="tk_d1d543f534424690b501ce3218260667"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
