/**
 * DTOs = the exact shape of the JSON files in /src/data (and of the future API).
 * snake_case, because that is what a typical backend returns.
 * If your real API differs, change ONLY these types + src/lib/mappers.ts.
 */

export interface LinkDTO {
  label: string;
  url: string;
  external?: boolean;
}

export interface NavItemDTO extends LinkDTO {
  mega_menu?: { columns: LinkDTO[][]; view_all: LinkDTO };
}

export interface AccountMenuItemDTO {
  label: string;
  url?: string;
  children?: LinkDTO[];
}

export interface ProductDTO {
  id: string;
  name: string;
  slug: string;
  image_url: string;
  price?: number | null;
  weight_kg?: number | null;
  description?: string | null;
  key_ingredients?: string | null;
  category_slug?: string | null;
}

export interface CartItemDTO {
  id: string;
  product_name: string;
  image_url: string;
  qty: number;
  amount: number;
  total_weight_kg: number;
}

export interface SiteDTO {
  brand: { name: string; logo_url: string; footer_description: string; copyright: string };
  seo: {
    site_name: string;
    title: string;
    description: string;
    og_image_url: string;
    favicon_url: string;
  };
  contact: {
    order_phone: string;
    order_phone_tel: string;
    support_phone: string;
    support_whatsapp: string;
    floating_whatsapp_number: string;
    floating_whatsapp_message: string;
    email_us_url: string;
    catalog_url: string;
  };
  top_bar: {
    catalog_label: string;
    order_label: string;
    email_label: string;
    sign_in_label: string;
    sign_in_url: string;
  };
  search: { placeholder: string; action_url: string };
  header_buttons: (LinkDTO & { variant: "primary" | "outline" })[];
  main_nav: NavItemDTO[];
  guest_menu: {
    existing_customers_title: string;
    login: LinkDTO;
    new_customers_title: string;
    register: LinkDTO;
  };
  account_menu: { title: string; items: AccountMenuItemDTO[] };
  cart: {
    title: string;
    empty_message: string;
    empty_link: LinkDTO;
    grand_total_label: string;
    checkout_label: string;
    checkout_url: string;
    items: CartItemDTO[];
  };
  footer: {
    newsletter_label: string;
    newsletter_placeholder: string;
    newsletter_button: string;
    columns: { title: string; links: LinkDTO[] }[];
    social_title: string;
    social: { network: string; url: string }[];
    payment_icons: { name: string; image_url: string }[];
  };
}

export interface HomeDTO {
  hero_banners: {
    id: string;
    image_url: string;
    subtitle: string;
    title: string;
    cta_label: string;
    cta_url: string;
  }[];
  product_tabs: { id: string; label: string; products: ProductDTO[] }[];
  popular_categories: {
    title: string;
    subtitle: string;
    items: { id: string; name: string; url: string; image_url: string | null }[];
    view_all: LinkDTO;
  };
  register_banner: { title: string; cta_label: string; cta_url: string };
  applications: {
    title: string;
    subtitle: string;
    items: { id: string; name: string; url: string; image_url: string; description: string }[];
    view_all: LinkDTO;
  };
  blog_section: {
    title: string;
    subtitle: string;
    background_image_url: string;
    view_all: LinkDTO;
    read_more_label: string;
    posts: {
      id: string;
      slug: string;
      title: string;
      image_url: string;
      published_at: string;
      excerpt: string;
    }[];
  };
}

/* ------------------------------------------------------------------ catalog */
export interface CategoryDTO {
  id: string;
  slug: string;
  name: string;
  seo_title: string | null;
  seo_description: string | null;
  intro: string | null;
  image_url: string | null;
  products: ProductDTO[];
}
export interface SolutionDTO {
  id: string;
  slug: string;
  name: string;
  image_url: string | null;
  intro: string | null;
}
export interface CatalogDTO {
  category_page: {
    title: string;
    subtitle: string;
    seo_title: string;
    seo_description: string;
    sidebar_title: string;
    empty_products: string;
  };
  solution_page: { title: string; subtitle: string };
  categories: CategoryDTO[];
  solutions: SolutionDTO[];
}
export interface ProductsDTO {
  products: ProductDTO[];
}

/* --------------------------------------------------------------------- blog */
export interface BlogPostDTO {
  id: string;
  slug: string;
  title: string;
  image_url: string;
  published_at: string;
  excerpt: string;
  categories: string[];
  body: string | null;
}
export interface BlogDTO {
  page: { title: string; subtitle: string };
  categories: { id: string; label: string; slug: string; seo_title: string }[];
  recent_count: number;
  posts: BlogPostDTO[];
}
