import type { Metadata } from "next";
import PlausibleProvider from "next-plausible";
import "./globals.css";

let title = "Pixon - Turn Ideas into Apps";
let description = "Generate your next app with AI instantly.";
let url = "https://pixon.app/";
let ogimage = "https://pixon.app/og-image.png";
let sitename = "pixon.app";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,

  openGraph: {
    images: [ogimage],
    title,
    description,
    url: url,
    siteName: sitename,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [ogimage],
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <PlausibleProvider domain="llamacoder.io" />
      </head>

      {children}
    </html>
  );
}
