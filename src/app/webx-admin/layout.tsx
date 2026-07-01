import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin CMS",
  description: "Web X website content management workspace.",
};

export default function WebXAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
