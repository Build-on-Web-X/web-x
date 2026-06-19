import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { WorksGallery } from "@/components/works-gallery";

export const metadata: Metadata = {
  title: "Works | Web X",
  description:
    "Explore Web X website projects across development, landing pages, e-commerce, redesigns, maintenance, and deployment.",
};

export default function WorksPage() {
  return (
    <>
      <Navbar />
      <WorksGallery />
    </>
  );
}
