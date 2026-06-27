import type { Metadata } from "next";
import { StartProjectPage } from "@/components/start-project-page";

export const metadata: Metadata = {
  title: "Start a Project",
  description: "Start a project with Web X.",
};

export default function StartAProjectPage() {
  return <StartProjectPage />;
}
