import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Newsreader, Fustat } from "next/font/google";
import { CSPostHogProvider } from "./providers";
import PostHogPageView from "./pageview";
import React, { Suspense } from "react";
const newsreader = Newsreader({ subsets: ["latin"] });
const fustat = Fustat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZK Email",
  description:
    "ZK Email lets you make privacy-preserving proofs of your existing emails. You can prove you own an email at some domain, prove attendance at a real-world event, or confirm transactions on chain.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/favicon-dark.svg",
        type: "image/svg+xml",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/favicon-light.svg",
        type: "image/svg+xml",
      },
    ],
    apple: [
      {
        url: "/favicon.png",
        type: "image/png",
      },
    ],
    shortcut: [
      {
        url: "/favicon-dark.svg",
        type: "image/svg+xml",
      },
    ],
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
          type="image/svg+xml"
          href="/favicon-dark.svg"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/favicon-light.svg"
          media="(prefers-color-scheme: dark)"
        />
        <link rel="apple-touch-icon" type="image/png" href="/favicon.png" />
        <link
          rel="shortcut icon"
          type="image/svg+xml"
          href="/favicon-dark.svg"
        />
      </head>
      <body
        className={`${newsreader.className} ${fustat.className} antialiased`}
      >
        <CSPostHogProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <PostHogPageView />
            <Navbar />
            {children}
          </Suspense>
          <Footer />
        </CSPostHogProvider>
      </body>
    </html>
  );
}
