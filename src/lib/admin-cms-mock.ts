export type Work = {
  id: number; title: string; slug: string; service: string; description: string;
  outcome: string; projectUrl: string; sortOrder: number; active: boolean; image?: string;
};

export type Service = {
  id: number; title: string; description: string; iconKey: string;
  sortOrder: number; active: boolean; image?: string;
};

export type Testimonial = {
  id: number; name: string; role: string; quote: string;
  sortOrder: number; active: boolean; image?: string;
};

export type AuditLog = {
  id: string;
  timestamp: string;
  actor: string;
  action: "Created" | "Updated" | "Deleted" | "Uploaded" | "Reordered" | "Toggled visibility" | "Signed in" | "Sent magic link preview";
  section: "Projects / Works" | "Featured Works" | "Services" | "Testimonials" | "Client Portal Content" | "Media Library" | "Settings" | "Auth";
  item: string;
  summary: string;
  status: "Complete" | "Preview";
  metadata: Record<string, string>;
};

export const auditLogs: AuditLog[] = [
  { id: "AUD-008", timestamp: "2026-07-01T14:42:00+08:00", actor: "buildonwebx@gmail.com", action: "Updated", section: "Client Portal Content", item: "WEBX-DEMO", summary: "Updated client portal project status and delivery notes.", status: "Complete", metadata: { field: "project status", projectId: "WEBX-DEMO", source: "Local preview" } },
  { id: "AUD-007", timestamp: "2026-07-01T14:18:00+08:00", actor: "buildonwebx@gmail.com", action: "Sent magic link preview", section: "Auth", item: "buildonwebx@gmail.com", summary: "Sent a frontend-only magic link preview to the allowed admin email.", status: "Preview", metadata: { recipient: "buildonwebx@gmail.com", delivery: "Simulated", source: "Admin access" } },
  { id: "AUD-006", timestamp: "2026-07-01T13:54:00+08:00", actor: "buildonwebx@gmail.com", action: "Updated", section: "Testimonials", item: "Liam Rivera", summary: "Edited testimonial copy and role attribution.", status: "Complete", metadata: { field: "quote, role", recordId: "testimonial-04", source: "Local state" } },
  { id: "AUD-005", timestamp: "2026-07-01T12:36:00+08:00", actor: "buildonwebx@gmail.com", action: "Updated", section: "Services", item: "Website Development", summary: "Updated service positioning and supporting description.", status: "Complete", metadata: { field: "description", recordId: "service-01", source: "Local state" } },
  { id: "AUD-004", timestamp: "2026-07-01T11:20:00+08:00", actor: "buildonwebx@gmail.com", action: "Uploaded", section: "Media Library", item: "kuyakoks-thumbnail.png", summary: "Uploaded a new project thumbnail to the local media preview.", status: "Preview", metadata: { format: "PNG", size: "428 KB", destination: "Project thumbnails" } },
  { id: "AUD-003", timestamp: "2026-07-01T10:48:00+08:00", actor: "buildonwebx@gmail.com", action: "Toggled visibility", section: "Featured Works", item: "Agent Mesh", summary: "Changed homepage visibility from visible to hidden.", status: "Complete", metadata: { previous: "Visible", current: "Hidden", placement: "Featured works" } },
  { id: "AUD-002", timestamp: "2026-07-01T10:15:00+08:00", actor: "buildonwebx@gmail.com", action: "Reordered", section: "Featured Works", item: "Salikop", summary: "Moved the featured work from position three to position two.", status: "Complete", metadata: { previousOrder: "03", currentOrder: "02", placement: "Homepage" } },
  { id: "AUD-001", timestamp: "2026-07-01T09:32:00+08:00", actor: "buildonwebx@gmail.com", action: "Updated", section: "Projects / Works", item: "Kuya Kok's", summary: "Updated project description and outcome copy.", status: "Complete", metadata: { field: "description, outcome", recordId: "work-01", source: "Local state" } },
];

export const initialWorks: Work[] = [
  { id: 1, title: "Kuya Kok's", slug: "kuya-koks", service: "E-Commerce Websites", description: "A warm, conversion-led ordering experience for a growing food brand.", outcome: "Faster ordering and clearer product discovery.", projectUrl: "https://kuyakoks.com", sortOrder: 1, active: true },
  { id: 2, title: "Salikop", slug: "salikop", service: "Website Development", description: "A focused digital home for a community-led organization.", outcome: "A clearer mission and easier content discovery.", projectUrl: "https://salikop.example", sortOrder: 2, active: true },
  { id: 3, title: "Dalisay", slug: "dalisay", service: "Landing Pages", description: "A restrained campaign page built around clarity and trust.", outcome: "A concise funnel with stronger lead intent.", projectUrl: "", sortOrder: 3, active: true },
  { id: 4, title: "Agent Mesh", slug: "agent-mesh", service: "Website Redesigns", description: "A technical product story made accessible to modern teams.", outcome: "Improved positioning for an emerging category.", projectUrl: "https://agentmesh.example", sortOrder: 4, active: false },
];

export const initialServices: Service[] = [
  ["Website Development", "web", "Custom websites engineered for speed, clarity, and growth."],
  ["Landing Pages", "cursor", "Focused pages that turn campaign attention into action."],
  ["E-Commerce Websites", "bag", "Stores designed around smooth discovery and confident checkout."],
  ["Website Redesigns", "refresh", "Strategic redesigns that sharpen positioning and usability."],
  ["Website Maintenance", "tools", "Reliable improvements, fixes, and ongoing technical care."],
  ["Website Hosting & Deployment", "cloud", "Secure, performance-minded launches and hosting support."],
].map(([title, iconKey, description], index) => ({ id: index + 1, title, iconKey, description, sortOrder: index + 1, active: true }));

export const initialTestimonials: Testimonial[] = [
  { id: 1, name: "Mara Santos", role: "Founder, Northline Studio", quote: "Web X gave our ideas structure and made the entire website feel unmistakably ours.", sortOrder: 1, active: true },
  { id: 2, name: "Paolo Reyes", role: "Operations Lead, Kuya Kok's", quote: "The new experience is cleaner for customers and far easier for our team to explain.", sortOrder: 2, active: true },
  { id: 3, name: "Ari Mendoza", role: "Product Lead, Agent Mesh", quote: "They translated a complex product into a story people could understand in minutes.", sortOrder: 3, active: false },
];

export const mediaAssets = [
  ["kuya-koks-cover.webp", "Project thumbnail", "WEBP", "384 KB"],
  ["salikop-hero.jpg", "Featured work", "JPG", "612 KB"],
  ["dalisay-detail.webp", "Project gallery", "WEBP", "428 KB"],
  ["service-development.jpg", "Service image", "JPG", "305 KB"],
  ["mara-santos-avatar.webp", "Testimonial", "WEBP", "92 KB"],
  ["webx-og-image.png", "Social preview", "PNG", "740 KB"],
];

export const portalProject = {
  clientId: "WEBX-DEMO", projectName: "Northline Studio Website", clientName: "Northline Studio",
  phase: "Design", progress: 58, status: "Homepage direction approved. Inner page design is in progress.",
  steps: ["Discovery complete", "Content structure approved", "Homepage design in review", "Inner pages queued"],
  documents: ["Project brief.pdf", "Content worksheet.docx", "Homepage direction.pdf"],
  messages: ["Homepage feedback received", "Updated copy shared by client"],
  notes: "Keep the portfolio case studies concise and image-led.",
  links: ["Figma workspace", "Shared Google Drive", "Staging website"],
  actions: ["Finish homepage revisions", "Prepare mobile direction", "Request final team biographies"],
};
