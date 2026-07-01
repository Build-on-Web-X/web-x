import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dev Console",
  description: "Internal Web X client and project operations console.",
};

export default function WebXDevLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
