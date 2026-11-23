/** View models used by the UI. camelCase, display-ready. UI never sees DTOs. */

export interface Link {
  label: string;
  href: string;
  external: boolean;
}

export interface NavItem extends Link {
  megaMenu?: { columns: Link[][]; viewAll: Link };
}

export interface AccountMenuItem {
  label: string;
  href?: string;
  children: Link[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  href: string;
  imageUrl: string;
  priceLabel: string | null;
  description: string | null;
  keyIngredients: string | null;
  categorySlug: string | null;
}

export interface CartItem {
  id: string;
  productName: string;
  imageUrl: string;
  qty: number;
  amountLabel: string;
  weightLabel: string;
}

export interface Site {
  brand: { name: string; logoUrl: string; footerDescription: string; copyright: string };
  seo: { siteName: string; title: string; description: string; ogImageUrl: string; faviconUrl: string };
  contact: {
    orderPhone: string;
    orderPhoneHref: string;
    supportPhone: string;
    supportWhatsappHref: string;
    floatingWhatsappHref: string;
    emailUsHref: string;
    catalogHref: string;
  };
  topBar: {
    catalogLabel: string;
    orderLabel: string;
    emailLabel: string;
    signInLabel: string;
    signInHref: string;
  };
  search: { placeholder: string; actionHref: string };
  headerButtons: (Link & { variant: "primary" | "outline" })[];
  mainNav: NavItem[];
  guestMenu: {
    existingCustomersTitle: string;
    login: Link;
    newCustomersTitle: string;
    register: Link;
  };
  accountMenu: { title: string; items: AccountMenuItem[] };
  cart: {
    title: string;
    emptyMessage: string;
    emptyLink: Link;
    grandTotalLabel: string;
    checkoutLabel: string;
    checkoutHref: string;
    items: CartItem[];
    totalLabel: string;
  };
  footer: {
    newsletterLabel: string;
    newsletterPlaceholder: string;
    newsletterButton: string;
    columns: { title: string; links: Link[] }[];
    socialTitle: string;
    social: { network: string; href: string }[];
    paymentIcons: { name: string; imageUrl: string }[];
  };
}

export interface HeroBanner {
  id: string;
  imageUrl: string;
  subtitle: string;
  title: string;
  cta: Link;
}

export interface ProductTab {
  id: string;
  label: string;
  products: Product[];
}

export interface CategoryTile {
  id: string;
  name: string;
  href: string;
  imageUrl: string | null;
}

export interface ApplicationCard {
  id: string;
  name: string;
  href: string;
  imageUrl: string;
  description: string;
}

export interface BlogPost {
  id: string;
  title: string;
  href: string;
  imageUrl: string;
  isoDate: string;
  dateLabel: string;
  excerpt: string;
}

export interface HomePage {
  heroBanners: HeroBanner[];
  productTabs: ProductTab[];
  popularCategories: { title: string; subtitle: string; items: CategoryTile[]; viewAll: Link };
  registerBanner: { title: string; cta: Link };
  applications: { title: string; subtitle: string; items: ApplicationCard[]; viewAll: Link };
  blogSection: {
    title: string;
    subtitle: string;
    backgroundImageUrl: string;
    viewAll: Link;
    readMoreLabel: string;
    posts: BlogPost[];
  };
}

/* ------------------------------------------------------------------ catalog */
export interface CatalogCategory {
  id: string;
  slug: string;
  name: string;
  href: string;
  seoTitle: string | null;
  seoDescription: string | null;
  intro: string | null;
  imageUrl: string | null;
  products: Product[];
}
export interface Solution {
  id: string;
  slug: string;
  name: string;
  href: string;
  imageUrl: string | null;
  intro: string | null;
}
export interface Catalog {
  categoryPage: {
    title: string;
    subtitle: string;
    seoTitle: string;
    seoDescription: string;
    sidebarTitle: string;
    emptyProducts: string;
  };
  solutionPage: { title: string; subtitle: string };
  categories: CatalogCategory[];
  solutions: Solution[];
}

/* --------------------------------------------------------------------- blog */
export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  href: string;
  imageUrl: string;
  isoDate: string;
  dateLabel: string;
  excerpt: string;
  categories: string[];
  body: string | null;
}
export interface BlogCategory {
  id: string;
  label: string;
  slug: string;
  href: string;
  seoTitle: string;
}
export interface Blog {
  page: { title: string; subtitle: string };
  categories: BlogCategory[];
  recentCount: number;
  posts: BlogArticle[];
}

/* -------------------------------------------------------------- static pages */
export interface TextBlock {
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  text?: string;
  imageUrl?: string;
  paragraphs?: string[];
}
export interface AboutPage {
  seoTitle: string;
  title: string;
  subtitle: string;
  why: Required<Pick<TextBlock, "eyebrow" | "title" | "imageUrl" | "paragraphs">>;
  vision: { title: string; text: string };
  mission: { title: string; text: string };
  legacy: Required<Pick<TextBlock, "title" | "subtitle" | "imageUrl" | "paragraphs">>;
  quality: Required<Pick<TextBlock, "title" | "subtitle" | "imageUrl" | "paragraphs">>;
  clients: { title: string; subtitle: string; logos: { name: string; imageUrl: string }[] };
}
export interface ContactPage {
  seoTitle: string;
  title: string;
  subtitle: string;
  intro: string;
  form: { title: string; statePlaceholder: string; submitLabel: string; states: string[] };
  mapEmbedUrl: string;
  offices: { title: string; address: string; email: string; websiteLabel: string; websiteUrl: string }[];
  support: { title: string; phones: { label: string; whatsapp: string }[]; email: string };
  follow: { title: string; links: { network: string; url: string }[] };
}
export interface BakerSupportField {
  id: string;
  label: string;
  type: "text" | "textarea";
  max?: number;
}
export interface BakerSupportPage {
  seoTitle: string;
  title: string;
  subtitle: string;
  services: { title: string; quote: string; items: { title: string; text: string }[] };
  form: {
    title: string;
    subtitle: string;
    imageUrl: string;
    fields: { name: string; company: string; country: string; email: string; phone: string };
    tabs: { id: string; label: string; fields: BakerSupportField[] }[];
    submitLabel: string;
  };
}
export interface LegalPage {
  seoTitle: string;
  title: string;
  breadcrumb: string;
  sections: { heading: string | null; paragraphs: string[] }[];
}
export interface DynamicListPage {
  seoTitle: string;
  title: string;
  subtitle: string;
  empty: string;
}
export interface RecipePage extends DynamicListPage {
  recipes: { id: string; name: string; slug: string; imageUrl: string; altText: string }[];
}
export interface FaqPage extends DynamicListPage {
  categories: { id: string; name: string }[];
  faqs: { id: string; categoryId: string; question: string; answer: string }[];
}
export interface AuthPages {
  login: {
    title: string;
    subtitle: string;
    email: string;
    password: string;
    submit: string;
    altText: string;
    altLink: { label: string; url: string };
  };
  register: {
    title: string;
    subtitle: string;
    fields: { name: string; company: string; email: string; phone: string; password: string };
    submit: string;
    altText: string;
    altLink: { label: string; url: string };
  };
}
