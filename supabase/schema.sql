create extension if not exists pgcrypto;

create table if not exists public.works (
  id uuid primary key default gen_random_uuid(),
  service text not null,
  title text not null,
  slug text not null unique,
  image_url text not null,
  description text not null,
  outcome text not null,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.featured_works (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  title text not null,
  slug text not null unique,
  image_url text not null,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.service_images (
  id uuid primary key default gen_random_uuid(),
  title text not null unique,
  description text not null,
  icon_key text not null,
  image_url text not null,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  role text not null,
  quote text not null,
  image_url text not null,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.works enable row level security;
alter table public.featured_works enable row level security;
alter table public.service_images enable row level security;
alter table public.testimonials enable row level security;

drop policy if exists "Public can read active works" on public.works;
create policy "Public can read active works"
  on public.works for select
  using (is_active = true);

drop policy if exists "Public can read active featured works" on public.featured_works;
create policy "Public can read active featured works"
  on public.featured_works for select
  using (is_active = true);

drop policy if exists "Public can read active service images" on public.service_images;
create policy "Public can read active service images"
  on public.service_images for select
  using (is_active = true);

drop policy if exists "Public can read active testimonials" on public.testimonials;
create policy "Public can read active testimonials"
  on public.testimonials for select
  using (is_active = true);

insert into public.works
  (service, title, slug, image_url, description, outcome, sort_order, is_active)
values
  ('Website Development', 'Northline Studio', 'northline-studio', 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1300&q=80', 'A polished business website built to clarify positioning, guide prospects, and make the brand feel established from the first visit.', 'Credibility-first company presence', 1, true),
  ('Website Development', 'Cedar Legal', 'cedar-legal', 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1300&q=80', 'A structured service website that makes expertise easy to understand, with clear pathways for consultation requests.', 'Authority-led service site', 2, true),
  ('Landing Pages', 'NovaLaunch Campaign', 'novalaunch-campaign', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1300&q=80', 'A focused campaign page designed around one offer, fast comprehension, and a clean path from interest to inquiry.', 'Lead-focused launch flow', 3, true),
  ('Landing Pages', 'Pulse Webinar', 'pulse-webinar', 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1300&q=80', 'A conversion-focused event page with crisp messaging, proof points, and a frictionless registration path.', 'Campaign sign-up experience', 4, true),
  ('E-Commerce Websites', 'Luma Goods', 'luma-goods', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1300&q=80', 'A commerce experience that brings product storytelling, trust signals, and checkout readiness into one streamlined storefront.', 'Product discovery to purchase', 5, true),
  ('E-Commerce Websites', 'Verde Market', 'verde-market', 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1300&q=80', 'A clean storefront system designed to help customers browse categories, compare products, and buy with confidence.', 'Retail-ready shopping flow', 6, true),
  ('Website Redesigns', 'Atlas Finance', 'atlas-finance', 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1300&q=80', 'A modernized web presence rebuilt for better hierarchy, stronger trust, and clearer conversion paths across key pages.', 'Sharper UX and stronger trust', 7, true),
  ('Website Redesigns', 'Maven Health', 'maven-health', 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1300&q=80', 'A refreshed website architecture that turns scattered service content into a calmer, more credible client journey.', 'Clearer information architecture', 8, true),
  ('Website Maintenance', 'Harbor Care', 'harbor-care', 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1300&q=80', 'Ongoing improvements, content updates, and performance checks that keep the website current after launch.', 'Reliable post-launch support', 9, true),
  ('Website Maintenance', 'Metric Loop', 'metric-loop', 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1300&q=80', 'A maintenance partnership covering content changes, quality checks, and site improvements after launch.', 'Steady website operations', 10, true),
  ('Hosting & Deployment', 'BrightPath Launch', 'brightpath-launch', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1300&q=80', 'A clean deployment setup with domain connection, SSL, hosting configuration, and launch checks handled end to end.', 'Smooth launch operations', 11, true),
  ('Hosting & Deployment', 'Summit Deploy', 'summit-deploy', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1300&q=80', 'A deployment setup built around stable hosting, domain readiness, SSL configuration, and final launch QA.', 'Prepared production release', 12, true)
on conflict (slug) do update set
  service = excluded.service,
  title = excluded.title,
  image_url = excluded.image_url,
  description = excluded.description,
  outcome = excluded.outcome,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active,
  updated_at = now();

insert into public.featured_works
  (category, title, slug, image_url, sort_order, is_active)
values
  ('Website Development', 'Northline Studio', 'northline-studio', 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80', 1, true),
  ('Landing Page', 'NovaLaunch Campaign', 'novalaunch-campaign', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80', 2, true),
  ('E-Commerce', 'Luma Goods', 'luma-goods', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80', 3, true),
  ('Website Redesign', 'Atlas Finance', 'atlas-finance', 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=80', 4, true)
on conflict (slug) do update set
  category = excluded.category,
  title = excluded.title,
  image_url = excluded.image_url,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active,
  updated_at = now();

insert into public.service_images
  (title, description, icon_key, image_url, sort_order, is_active)
values
  ('Website Development', 'Custom websites built for businesses, startups, and organizations.', 'website-development', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 1, true),
  ('Landing Pages', 'High-converting landing pages for campaigns, products, events, and lead generation.', 'landing-pages', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80', 2, true),
  ('E-Commerce Websites', 'Online stores designed to showcase products and streamline purchases.', 'e-commerce-websites', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80', 3, true),
  ('Website Redesigns', 'Modernizing outdated websites to improve user experience, performance, and credibility.', 'website-redesigns', 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=900&q=80', 4, true),
  ('Website Maintenance', 'Ongoing updates, security monitoring, backups, and technical support.', 'website-maintenance', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80', 5, true),
  ('Website Hosting & Deployment', 'Domain connection, hosting setup, SSL configuration, and website launch management.', 'hosting-deployment', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80', 6, true)
on conflict (title) do update set
  description = excluded.description,
  icon_key = excluded.icon_key,
  image_url = excluded.image_url,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active,
  updated_at = now();

insert into public.testimonials
  (name, role, quote, image_url, sort_order, is_active)
values
  ('Liam Rivera', 'Startup Founder', 'Web X turned a scattered idea into a website that finally feels credible, clear, and ready for customers.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80', 1, true),
  ('Sophia Hart', 'Product Lead', 'The process was thoughtful from strategy to launch. The site looks premium and performs exactly how we needed.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=80', 2, true),
  ('Marcus Chen', 'Operations Director', 'They helped us simplify a complex offer and turn it into a polished digital experience our team is proud to share.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80', 3, true),
  ('Elena Brooks', 'Marketing Manager', 'Our new landing page gave campaigns a stronger first impression and made our message much easier to understand.', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=700&q=80', 4, true),
  ('Noah Patel', 'Agency Partner', 'Fast communication, sharp design instincts, and a launch that felt smooth from start to finish.', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80', 5, true),
  ('Ava Morrison', 'Brand Strategist', 'They understood the brand quickly and translated it into a website that feels modern without losing clarity.', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80', 6, true)
on conflict (name) do update set
  role = excluded.role,
  quote = excluded.quote,
  image_url = excluded.image_url,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active,
  updated_at = now();
