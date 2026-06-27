import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  description:
    "Web X admin workspace for reviewing clients, project pipeline, tasks, and messages.",
};

export default function WebXAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
