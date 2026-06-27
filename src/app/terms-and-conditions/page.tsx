import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Review the terms that apply when using the Web X website and engaging our website design and development services.",
};

const sections = [
  {
    title: "Use of this website",
    body: [
      "By using this website, you agree to use it only for lawful purposes and in a way that does not interfere with the site, its security, or other visitors.",
      "Website content is provided for general information about Web X services and does not create a client relationship until a separate agreement is accepted.",
    ],
  },
  {
    title: "Project inquiries",
    body: [
      "Submitting a project inquiry does not guarantee availability, pricing, delivery dates, or acceptance of a project.",
      "Project scope, pricing, timelines, deliverables, payment terms, ownership, and responsibilities are confirmed separately in a written proposal, contract, invoice, or statement of work.",
    ],
  },
  {
    title: "Intellectual property",
    body: [
      "The Web X name, logo, website design, copy, and related materials are owned by Web X or used with permission and may not be copied without authorization.",
      "Client deliverable ownership is handled according to the signed project agreement and may depend on payment completion, third-party licenses, and project-specific terms.",
    ],
  },
  {
    title: "Third-party services",
    body: [
      "Projects may use third-party tools, platforms, fonts, hosting, plugins, analytics, payment processors, or integrations. Those services are governed by their own terms and policies.",
      "Web X is not responsible for outages, pricing changes, policy changes, or limitations from third-party providers.",
    ],
  },
  {
    title: "Limitation of liability",
    body: [
      "The website is provided as available. To the fullest extent permitted by law, Web X is not liable for indirect, incidental, special, or consequential damages related to website use.",
      "Any project-specific warranties, remedies, or liability limits are defined in the applicable written agreement.",
    ],
  },
  {
    title: "Contact",
    body: [
      "For questions about these terms, email us at buildonwebx@gmail.com.",
    ],
  },
];

export default function TermsAndConditionsPage() {
  return (
    <LegalPage
      intro="These Terms and Conditions explain the basic rules for using the Web X website and starting a project conversation with us."
      sections={sections}
      title="Terms and Conditions"
    />
  );
}
