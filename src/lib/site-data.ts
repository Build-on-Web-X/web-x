export type Work = {
  service: string;
  title: string;
  slug: string;
  image: string;
  description: string;
  outcome: string;
  sortOrder: number;
};

export type FeaturedWork = {
  category: string;
  title: string;
  slug: string;
  image: string;
  sortOrder: number;
};

export type ServiceImage = {
  title: string;
  description: string;
  iconKey: string;
  image: string;
  sortOrder: number;
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  image: string;
  sortOrder: number;
};

export const works: Work[] = [
  {
    service: "Website Development",
    title: "Northline Studio",
    slug: "northline-studio",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1300&q=80",
    description:
      "A polished business website built to clarify positioning, guide prospects, and make the brand feel established from the first visit.",
    outcome: "Credibility-first company presence",
    sortOrder: 1,
  },
  {
    service: "Website Development",
    title: "Cedar Legal",
    slug: "cedar-legal",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1300&q=80",
    description:
      "A structured service website that makes expertise easy to understand, with clear pathways for consultation requests.",
    outcome: "Authority-led service site",
    sortOrder: 2,
  },
  {
    service: "Landing Pages",
    title: "NovaLaunch Campaign",
    slug: "novalaunch-campaign",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1300&q=80",
    description:
      "A focused campaign page designed around one offer, fast comprehension, and a clean path from interest to inquiry.",
    outcome: "Lead-focused launch flow",
    sortOrder: 3,
  },
  {
    service: "Landing Pages",
    title: "Pulse Webinar",
    slug: "pulse-webinar",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1300&q=80",
    description:
      "A conversion-focused event page with crisp messaging, proof points, and a frictionless registration path.",
    outcome: "Campaign sign-up experience",
    sortOrder: 4,
  },
  {
    service: "E-Commerce Websites",
    title: "Luma Goods",
    slug: "luma-goods",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1300&q=80",
    description:
      "A commerce experience that brings product storytelling, trust signals, and checkout readiness into one streamlined storefront.",
    outcome: "Product discovery to purchase",
    sortOrder: 5,
  },
  {
    service: "E-Commerce Websites",
    title: "Verde Market",
    slug: "verde-market",
    image:
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1300&q=80",
    description:
      "A clean storefront system designed to help customers browse categories, compare products, and buy with confidence.",
    outcome: "Retail-ready shopping flow",
    sortOrder: 6,
  },
  {
    service: "Website Redesigns",
    title: "Atlas Finance",
    slug: "atlas-finance",
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1300&q=80",
    description:
      "A modernized web presence rebuilt for better hierarchy, stronger trust, and clearer conversion paths across key pages.",
    outcome: "Sharper UX and stronger trust",
    sortOrder: 7,
  },
  {
    service: "Website Redesigns",
    title: "Maven Health",
    slug: "maven-health",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1300&q=80",
    description:
      "A refreshed website architecture that turns scattered service content into a calmer, more credible client journey.",
    outcome: "Clearer information architecture",
    sortOrder: 8,
  },
  {
    service: "Website Maintenance",
    title: "Harbor Care",
    slug: "harbor-care",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1300&q=80",
    description:
      "Ongoing improvements, content updates, and performance checks that keep the website current after launch.",
    outcome: "Reliable post-launch support",
    sortOrder: 9,
  },
  {
    service: "Website Maintenance",
    title: "Metric Loop",
    slug: "metric-loop",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1300&q=80",
    description:
      "A maintenance partnership covering content changes, quality checks, and site improvements after launch.",
    outcome: "Steady website operations",
    sortOrder: 10,
  },
  {
    service: "Hosting & Deployment",
    title: "BrightPath Launch",
    slug: "brightpath-launch",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1300&q=80",
    description:
      "A clean deployment setup with domain connection, SSL, hosting configuration, and launch checks handled end to end.",
    outcome: "Smooth launch operations",
    sortOrder: 11,
  },
  {
    service: "Hosting & Deployment",
    title: "Summit Deploy",
    slug: "summit-deploy",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1300&q=80",
    description:
      "A deployment setup built around stable hosting, domain readiness, SSL configuration, and final launch QA.",
    outcome: "Prepared production release",
    sortOrder: 12,
  },
];

export const featuredWorks: FeaturedWork[] = [
  {
    category: "Website Development",
    title: "Northline Studio",
    slug: "northline-studio",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
    sortOrder: 1,
  },
  {
    category: "Landing Page",
    title: "NovaLaunch Campaign",
    slug: "novalaunch-campaign",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    sortOrder: 2,
  },
  {
    category: "E-Commerce",
    title: "Luma Goods",
    slug: "luma-goods",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
    sortOrder: 3,
  },
  {
    category: "Website Redesign",
    title: "Atlas Finance",
    slug: "atlas-finance",
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=80",
    sortOrder: 4,
  },
];

export const serviceImages: ServiceImage[] = [
  {
    title: "Website Development",
    description:
      "Custom websites built for businesses, startups, and organizations.",
    iconKey: "website-development",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    sortOrder: 1,
  },
  {
    title: "Landing Pages",
    description:
      "High-converting landing pages for campaigns, products, events, and lead generation.",
    iconKey: "landing-pages",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
    sortOrder: 2,
  },
  {
    title: "E-Commerce Websites",
    description:
      "Online stores designed to showcase products and streamline purchases.",
    iconKey: "e-commerce-websites",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80",
    sortOrder: 3,
  },
  {
    title: "Website Redesigns",
    description:
      "Modernizing outdated websites to improve user experience, performance, and credibility.",
    iconKey: "website-redesigns",
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=900&q=80",
    sortOrder: 4,
  },
  {
    title: "Website Maintenance",
    description:
      "Ongoing updates, security monitoring, backups, and technical support.",
    iconKey: "website-maintenance",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    sortOrder: 5,
  },
  {
    title: "Website Hosting & Deployment",
    description:
      "Domain connection, hosting setup, SSL configuration, and website launch management.",
    iconKey: "hosting-deployment",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
    sortOrder: 6,
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Liam Rivera",
    role: "Startup Founder",
    quote:
      "Web X turned a scattered idea into a website that finally feels credible, clear, and ready for customers.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80",
    sortOrder: 1,
  },
  {
    name: "Sophia Hart",
    role: "Product Lead",
    quote:
      "The process was thoughtful from strategy to launch. The site looks premium and performs exactly how we needed.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=80",
    sortOrder: 2,
  },
  {
    name: "Marcus Chen",
    role: "Operations Director",
    quote:
      "They helped us simplify a complex offer and turn it into a polished digital experience our team is proud to share.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80",
    sortOrder: 3,
  },
  {
    name: "Elena Brooks",
    role: "Marketing Manager",
    quote:
      "Our new landing page gave campaigns a stronger first impression and made our message much easier to understand.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=700&q=80",
    sortOrder: 4,
  },
  {
    name: "Noah Patel",
    role: "Agency Partner",
    quote:
      "Fast communication, sharp design instincts, and a launch that felt smooth from start to finish.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80",
    sortOrder: 5,
  },
  {
    name: "Ava Morrison",
    role: "Brand Strategist",
    quote:
      "They understood the brand quickly and translated it into a website that feels modern without losing clarity.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80",
    sortOrder: 6,
  },
];
