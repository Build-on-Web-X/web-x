import type { Metadata } from "next";
import { Readex_Pro } from "next/font/google";
import Script from "next/script";
import { BookCallModalProvider } from "@/components/book-call-modal";
import { LenisProvider } from "@/components/lenis-provider";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";
import { SiteLoader } from "@/components/site-loader";
import { ThemeToggle } from "@/components/theme-toggle";
import "lenis/dist/lenis.css";
import "./globals.css";

const readexPro = Readex_Pro({
  variable: "--font-readex-pro",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Web X | Home",
    template: "Web X | %s",
  },
  description:
    "Web X creates modern digital experiences that help businesses build credibility, attract customers, and grow online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeScript = `
    try {
      var theme = localStorage.getItem("webx-theme") || "dark";
      document.documentElement.dataset.theme = theme;
      document.documentElement.classList.toggle("theme-light", theme === "light");
      document.documentElement.classList.toggle("theme-dark", theme !== "light");
    } catch (_) {}
  `;
  const loaderPreflightScript = `
    try {
      var forceLoader = ${JSON.stringify(process.env.NEXT_PUBLIC_FORCE_LOADER === "true")};
      if (forceLoader || !sessionStorage.getItem("webx-loader-seen")) {
        document.documentElement.classList.remove("webx-loader-done");
        document.documentElement.classList.add("webx-intro-pending", "webx-loader-active");
      } else {
        document.documentElement.classList.add("webx-loader-done");
      }
    } catch (_) {
      document.documentElement.classList.add("webx-intro-pending", "webx-loader-active");
    }
  `;

  return (
    <html
      lang="en"
      className={`${readexPro.variable} h-full antialiased theme-dark`}
      suppressHydrationWarning
    >
      <head>
        <Script id="webx-theme-preflight" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <Script id="webx-loader-preflight" strategy="beforeInteractive">
          {loaderPreflightScript}
        </Script>
      </head>
      <body className="min-h-full flex flex-col">
        <SiteLoader />
        <LenisProvider>
          <BookCallModalProvider>
            <div className="webx-page-shell">{children}</div>
            <ThemeToggle />
            <ScrollToTopButton />
          </BookCallModalProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
