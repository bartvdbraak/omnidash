import { Inter } from "next/font/google";
import LocalFont from "next/font/local";

import { ThemeProvider } from "@/components/theme-provider";
import "tailwindcss/tailwind.css";
import { ToastProvider } from "../toast-provider";

import { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs/app-beta";

export const metadata: Metadata = {
  title: {
    default: "Omnidash",
    template: "%s | Omnidash",
  },
  description: "Open Source Multi-client Ticket Dashboard",
  metadataBase: new URL("https://omnidash.io"),
  openGraph: {
    title: "Omnidash",
    description: "Open Source Multi-client Ticket Dashboard",
    url: "https://omnidash.io",
    siteName: "omnidash.io",
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Omnidash",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.png",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});
interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html
        lang="en"
        suppressHydrationWarning
        className={[inter.variable, calSans.variable].join(" ")}
      >
        <head>
          <meta charSet="utf-8"></meta>
        </head>
        <body className="min-h-screen antialiased">
          <ClerkProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
              <ToastProvider>{children}</ToastProvider>
            </ThemeProvider>
          </ClerkProvider>
        </body>
      </html>
    </>
  );
}
