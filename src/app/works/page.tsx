import type { Metadata } from "next";
import { Suspense } from "react";
import { Navbar } from "@/components/navbar";
import { WorksGallery } from "@/components/works-gallery";
import { getWorks } from "@/lib/supabase-data";

export const metadata: Metadata = {
  title: "Works",
  description:
    "Explore Web X website projects across development, landing pages, e-commerce, redesigns, maintenance, and deployment.",
};

export default async function WorksPage() {
  const works = await getWorks();

  return (
    <>
      <Navbar />
      <Suspense fallback={null}>
        <WorksGallery works={works} />
      </Suspense>
    </>
  );
}
