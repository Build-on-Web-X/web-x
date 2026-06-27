import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Portal",
  description:
    "Access the Web X client portal for project progress, messages, documents, and important links.",
};

export default function ClientPortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
