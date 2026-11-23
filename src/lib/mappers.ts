import type * as D from "@/types/dto";
import type * as M from "@/types/models";

const isExternal = (url: string) => /^https?:\/\//i.test(url);

/** Absolute swissbake.in URLs from an API are turned into site-relative paths. */
const toHref = (url: string) => url.replace(/^https?:\/\/(www\.)?swissbake\.in/i, "") || "/";

export const mapLink = (l: D.LinkDTO): M.Link => ({
  label: l.label,
  href: l.external ? l.url : toHref(l.url),
  external: l.external ?? (isExternal(l.url) && !/swissbake\.in/i.test(l.url)),
});

const inr = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });
const money = (n: number) => inr.format(n);

const weight = (kg: number) => (kg >= 1 ? `${kg} KG` : `${kg * 1000} GM`);

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

export const mapProduct = (p: D.ProductDTO): M.Product => ({
  id: p.id,
  slug: p.slug,
  name: p.name,
  href: `/product/${p.slug}`,
  imageUrl: p.image_url,
  priceLabel: p.price != null ? money(p.price) : null,
  description: p.description ?? null,
  keyIngredients: p.key_ingredients ?? null,
  categorySlug: p.category_slug ?? null,
});

export function mapSite(d: D.SiteDTO): M.Site {
  const c = d.contact;
  return {
    brand: {
      name: d.brand.name,
      logoUrl: d.brand.logo_url,
      footerDescription: d.brand.footer_description,
      copyright: d.brand.copyright,
    },
    seo: {
      siteName: d.seo.site_name,
      title: d.seo.title,
      description: d.seo.description,
      ogImageUrl: d.seo.og_image_url,
      faviconUrl: d.seo.favicon_url,
    },
    contact: {
      orderPhone: c.order_phone,
      orderPhoneHref: `tel:${c.order_phone_tel}`,
      supportPhone: c.support_phone,
      supportWhatsappHref: `https://api.whatsapp.com/send?phone=${c.support_whatsapp}`,
      floatingWhatsappHref: `https://api.whatsapp.com/send?phone=+${c.floating_whatsapp_number}&text=${encodeURIComponent(
        c.floating_whatsapp_message,
      )}`,
      emailUsHref: c.email_us_url,
      catalogHref: c.catalog_url,
    },
    topBar: {
      catalogLabel: d.top_bar.catalog_label,
      orderLabel: d.top_bar.order_label,
      emailLabel: d.top_bar.email_label,
      signInLabel: d.top_bar.sign_in_label,
      signInHref: d.top_bar.sign_in_url,
    },
    search: { placeholder: d.search.placeholder, actionHref: toHref(d.search.action_url) },
    headerButtons: d.header_buttons.map((b) => ({ ...mapLink(b), variant: b.variant })),
    mainNav: d.main_nav.map((n) => ({
      ...mapLink(n),
      megaMenu: n.mega_menu
        ? { columns: n.mega_menu.columns.map((col) => col.map(mapLink)), viewAll: mapLink(n.mega_menu.view_all) }
        : undefined,
    })),
    guestMenu: {
      existingCustomersTitle: d.guest_menu.existing_customers_title,
      login: mapLink(d.guest_menu.login),
      newCustomersTitle: d.guest_menu.new_customers_title,
      register: mapLink(d.guest_menu.register),
    },
    accountMenu: {
      title: d.account_menu.title,
      items: d.account_menu.items.map((i) => ({
        label: i.label,
        href: i.url,
        children: (i.children ?? []).map(mapLink),
      })),
    },
    cart: {
      title: d.cart.title,
      emptyMessage: d.cart.empty_message,
      emptyLink: mapLink(d.cart.empty_link),
      grandTotalLabel: d.cart.grand_total_label,
      checkoutLabel: d.cart.checkout_label,
      checkoutHref: d.cart.checkout_url,
      items: d.cart.items.map((i) => ({
        id: i.id,
        productName: i.product_name,
        imageUrl: i.image_url,
        qty: i.qty,
        amountLabel: money(i.amount),
        weightLabel: weight(i.total_weight_kg),
      })),
      totalLabel: money(d.cart.items.reduce((s, i) => s + i.amount, 0)),
    },
    footer: {
      newsletterLabel: d.footer.newsletter_label,
      newsletterPlaceholder: d.footer.newsletter_placeholder,
      newsletterButton: d.footer.newsletter_button,
      columns: d.footer.columns.map((col) => ({ title: col.title, links: col.links.map(mapLink) })),
      socialTitle: d.footer.social_title,
      social: d.footer.social.map((s) => ({ network: s.network, href: s.url })),
      paymentIcons: d.footer.payment_icons.map((p) => ({ name: p.name, imageUrl: p.image_url })),
    },
  };
}

export function mapHome(d: D.HomeDTO): M.HomePage {
  const bs = d.blog_section;
  return {
    heroBanners: d.hero_banners.map((b) => ({
      id: b.id,
      imageUrl: b.image_url,
      subtitle: b.subtitle,
      title: b.title,
      cta: mapLink({ label: b.cta_label, url: b.cta_url }),
    })),
    productTabs: d.product_tabs.map((t) => ({ id: t.id, label: t.label, products: t.products.map(mapProduct) })),
    popularCategories: {
      title: d.popular_categories.title,
      subtitle: d.popular_categories.subtitle,
      items: d.popular_categories.items.map((i) => ({
        id: i.id,
        name: i.name,
        href: toHref(i.url),
        imageUrl: i.image_url,
      })),
      viewAll: mapLink(d.popular_categories.view_all),
    },
    registerBanner: {
      title: d.register_banner.title,
      cta: mapLink({ label: d.register_banner.cta_label, url: d.register_banner.cta_url }),
    },
    applications: {
      title: d.applications.title,
      subtitle: d.applications.subtitle,
      items: d.applications.items.map((i) => ({
        id: i.id,
        name: i.name,
        href: toHref(i.url),
        imageUrl: i.image_url,
        description: i.description,
      })),
      viewAll: mapLink(d.applications.view_all),
    },
    blogSection: {
      title: bs.title,
      subtitle: bs.subtitle,
      backgroundImageUrl: bs.background_image_url,
      viewAll: mapLink(bs.view_all),
      readMoreLabel: bs.read_more_label,
      posts: bs.posts.map((p) => ({
        id: p.id,
        title: p.title,
        href: `/blog/${p.slug}`,
        imageUrl: p.image_url,
        isoDate: p.published_at,
        dateLabel: formatDate(p.published_at),
        excerpt: p.excerpt,
      })),
    },
  };
}

/* ------------------------------------------------------------------ catalog */
export function mapCatalog(d: D.CatalogDTO): M.Catalog {
  return {
    categoryPage: {
      title: d.category_page.title,
      subtitle: d.category_page.subtitle,
      seoTitle: d.category_page.seo_title,
      seoDescription: d.category_page.seo_description,
      sidebarTitle: d.category_page.sidebar_title,
      emptyProducts: d.category_page.empty_products,
    },
    solutionPage: d.solution_page,
    categories: d.categories.map((c) => ({
      id: c.id,
      slug: c.slug,
      name: c.name,
      href: `/category/${c.slug}`,
      seoTitle: c.seo_title,
      seoDescription: c.seo_description,
      intro: c.intro,
      imageUrl: c.image_url,
      products: c.products.map(mapProduct),
    })),
    solutions: d.solutions.map((s) => ({
      id: s.id,
      slug: s.slug,
      name: s.name,
      href: `/solution/${s.slug}`,
      imageUrl: s.image_url,
      intro: s.intro,
    })),
  };
}

/* --------------------------------------------------------------------- blog */
export function mapBlog(d: D.BlogDTO): M.Blog {
  return {
    page: d.page,
    recentCount: d.recent_count,
    categories: d.categories.map((c) => ({
      id: c.id,
      label: c.label,
      slug: c.slug,
      href: `/blogcategory/${c.slug}`,
      seoTitle: c.seo_title,
    })),
    posts: d.posts.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      href: `/blog/${p.slug}`,
      imageUrl: p.image_url,
      isoDate: p.published_at,
      dateLabel: formatDate(p.published_at),
      excerpt: p.excerpt,
      categories: p.categories,
      body: p.body,
    })),
  };
}

/* -------------------------------------------------------------- static pages */
const camel = (k: string) => k.replace(/_([a-z0-9])/g, (_, c: string) => c.toUpperCase());

/** Deep snake_case -> camelCase key conversion for content-only pages. */
export function camelize<T>(value: unknown): T {
  if (Array.isArray(value)) return value.map((v) => camelize(v)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([k, v]) => [camel(k), camelize(v)]),
    ) as T;
  }
  return value as T;
}
