import {
  featuredWorks as fallbackFeaturedWorks,
  serviceImages as fallbackServiceImages,
  testimonials as fallbackTestimonials,
  works as fallbackWorks,
  type FeaturedWork,
  type ServiceImage,
  type Testimonial,
  type Work,
} from "@/lib/site-data";

type WorkRow = {
  service: string;
  title: string;
  slug: string;
  image_url: string;
  description: string;
  outcome: string;
  sort_order: number;
  project_url: string | null;
};

type FeaturedWorkRow = {
  category: string;
  title: string;
  slug: string;
  image_url: string;
  sort_order: number;
};

type ServiceImageRow = {
  title: string;
  description: string;
  icon_key: string;
  image_url: string;
  sort_order: number;
};

type TestimonialRow = {
  name: string;
  role: string;
  quote: string;
  image_url: string;
  sort_order: number;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.SUPABASE_PUBLISHABLE_KEY;

function getRestUrl() {
  if (process.env.SUPABASE_REST_URL) {
    return process.env.SUPABASE_REST_URL.replace(/\/$/, "");
  }

  if (!supabaseUrl) {
    return null;
  }

  return `${supabaseUrl.replace(/\/$/, "")}/rest/v1`;
}

async function fetchTable<Row>(table: string): Promise<Row[] | null> {
  const restUrl = getRestUrl();

  if (!restUrl || !supabaseKey) {
    return null;
  }

  try {
    const response = await fetch(
      `${restUrl}/${table}?select=*&is_active=eq.true&order=sort_order.asc`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
        next: { revalidate: 60 },
      },
    );

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as Row[];
  } catch {
    return null;
  }
}

export async function getWorks(): Promise<Work[]> {
  const rows = await fetchTable<WorkRow>("works");

  if (!rows?.length) {
    return fallbackWorks;
  }

  return rows.map((row) => ({
    service: row.service,
    title: row.title,
    slug: row.slug,
    image: row.image_url,
    description: row.description,
    outcome: row.outcome,
    sortOrder: row.sort_order,
    projectUrl: row.project_url,
  }));
}

export async function getFeaturedWorks(): Promise<FeaturedWork[]> {
  const rows = await fetchTable<FeaturedWorkRow>("featured_works");

  if (!rows?.length) {
    return fallbackFeaturedWorks;
  }

  return rows.map((row) => ({
    category: row.category,
    title: row.title,
    slug: row.slug,
    image: row.image_url,
    sortOrder: row.sort_order,
  }));
}

export async function getServiceImages(): Promise<ServiceImage[]> {
  const rows = await fetchTable<ServiceImageRow>("service_images");

  if (!rows?.length) {
    return fallbackServiceImages;
  }

  return rows.map((row) => ({
    title: row.title,
    description: row.description,
    iconKey: row.icon_key,
    image: row.image_url,
    sortOrder: row.sort_order,
  }));
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const rows = await fetchTable<TestimonialRow>("testimonials");

  if (!rows?.length) {
    return fallbackTestimonials;
  }

  return rows.map((row) => ({
    name: row.name,
    role: row.role,
    quote: row.quote,
    image: row.image_url,
    sortOrder: row.sort_order,
  }));
}