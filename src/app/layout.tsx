import type { Metadata } from "next";
import { Readex_Pro } from "next/font/google";
import { BookCallModalProvider } from "@/components/book-call-modal";
import { LenisProvider } from "@/components/lenis-provider";
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

  return (
    <html
      lang="en"
      className={`${readexPro.variable} h-full antialiased theme-dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeScript }}
          suppressHydrationWarning
        />
      </head>
      <body className="min-h-full flex flex-col">
        <SiteLoader />
        <LenisProvider>
          <BookCallModalProvider>
            {children}
            <ThemeToggle />
          </BookCallModalProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
