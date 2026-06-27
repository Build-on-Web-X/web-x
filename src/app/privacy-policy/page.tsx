import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Web X collects, uses, and protects information submitted through our website and project inquiry forms.",
};

const sections = [
  {
    title: "Information we collect",
    body: [
      "We collect information you choose to submit through our website, including your name, email address, company name, project details, budget range, timeline, and any notes you provide.",
      "We may also receive basic technical information from your browser, such as device type, approximate location, pages visited, and interaction data used to improve site performance and usability.",
    ],
  },
  {
    title: "How we use information",
    body: [
      "We use submitted information to respond to inquiries, evaluate project fit, prepare recommendations, provide services, and communicate about active or potential projects.",
      "We do not sell personal information. We only use your details for legitimate business communication related to Web X services.",
    ],
  },
  {
    title: "Sharing and service providers",
    body: [
      "We may use trusted tools for hosting, email, analytics, project management, and client communication. These providers only receive information needed to support those services.",
      "We may disclose information if required by law, to protect our rights, or to prevent misuse of our website and services.",
    ],
  },
  {
    title: "Data retention",
    body: [
      "We keep inquiry and project information for as long as needed to respond, manage business records, support active work, and comply with legal or operational obligations.",
      "You may request that we update or delete information you have submitted, subject to records we need to retain for legitimate business or legal reasons.",
    ],
  },
  {
    title: "Contact",
    body: [
      "For privacy questions or requests, email us at buildonwebx@gmail.com.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      intro="This Privacy Policy explains how Web X handles information collected through our website, inquiry forms, and client communication channels."
      sections={sections}
      title="Privacy Policy"
    />
  );
}
