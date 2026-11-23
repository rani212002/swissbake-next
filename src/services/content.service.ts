import { cache } from "react";
import { fetchResource } from "./http";
import { camelize, mapBlog, mapCatalog, mapHome, mapProduct, mapSite } from "@/lib/mappers";
import type { BlogDTO, CatalogDTO, HomeDTO, ProductsDTO, SiteDTO } from "@/types/dto";
import type * as M from "@/types/models";
import type { HomePage, Site } from "@/types/models";

/** GET /site  -> header, footer, nav, contact, SEO */
export const getSite = cache(async (): Promise<Site> => {
  const dto = await fetchResource<SiteDTO>("/site", () => import("@/data/site.json"));
  return mapSite(dto);
});

/** GET /pages/home -> every homepage section */
export const getHomePage = cache(async (): Promise<HomePage> => {
  const dto = await fetchResource<HomeDTO>("/pages/home", () => import("@/data/home.json"));
  return mapHome(dto);
});

/** GET /catalog -> categories + applications (solutions) */
export const getCatalog = cache(async (): Promise<M.Catalog> => {
  const dto = await fetchResource<CatalogDTO>("/catalog", () => import("@/data/catalog.json"));
  return mapCatalog(dto);
});

/** GET /products */
export const getProducts = cache(async (): Promise<M.Product[]> => {
  const dto = await fetchResource<ProductsDTO>("/products", () => import("@/data/products.json"));
  return dto.products.map(mapProduct);
});

export async function getProduct(slug: string): Promise<M.Product | undefined> {
  return (await getProducts()).find((p) => p.slug === slug);
}

/** GET /blog */
export const getBlog = cache(async (): Promise<M.Blog> => {
  const dto = await fetchResource<BlogDTO>("/blog", () => import("@/data/blog.json"));
  return mapBlog(dto);
});

export async function getBlogPost(slug: string) {
  const wanted = safeDecode(slug);
  return (await getBlog()).posts.find((p) => safeDecode(p.slug) === wanted);
}

/** Posts for a blog tab (All / Trends / ... / Featured / Recents) */
export async function getBlogListing(categorySlug: string) {
  const blog = await getBlog();
  const category = blog.categories.find((c) => c.slug.toLowerCase() === categorySlug.toLowerCase());
  if (!category) return undefined;
  let posts = blog.posts;
  if (category.id === "recents") {
    posts = [...blog.posts]
      .sort((a, b) => b.isoDate.localeCompare(a.isoDate))
      .slice(0, blog.recentCount);
  } else if (category.id !== "all") {
    posts = blog.posts.filter((p) => p.categories.includes(category.id));
  }
  return { blog, category, posts };
}

function safeDecode(s: string) {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

/* ---- content pages: GET /pages/{name} ---- */
type Pages = typeof import("@/data/pages.json");
const loadPage = <K extends keyof Pages>(key: K) => () =>
  import("@/data/pages.json").then((m) => ({ default: m.default[key] }));

export const getAboutPage = cache(async () =>
  camelize<M.AboutPage>(await fetchResource("/pages/about", loadPage("about"))),
);
export const getContactPage = cache(async () =>
  camelize<M.ContactPage>(await fetchResource("/pages/contact", loadPage("contact"))),
);
export const getBakerSupportPage = cache(async () =>
  camelize<M.BakerSupportPage>(await fetchResource("/pages/baker-support", loadPage("baker_support"))),
);
export const getLegalPage = cache(async (slug: "privacy-policy" | "terms-of-use" | "shipping-policy") => {
  const all = await fetchResource<Record<string, unknown>>("/pages/legal", loadPage("legal"));
  return camelize<M.LegalPage>(all[slug]);
});
export const getRecipePage = cache(async () => {
  const d = await fetchResource<Record<string, unknown>>("/pages/dynamic", loadPage("dynamic"));
  return camelize<M.RecipePage>(d.recipe);
});
export const getFaqPage = cache(async () => {
  const d = await fetchResource<Record<string, unknown>>("/pages/dynamic", loadPage("dynamic"));
  return camelize<M.FaqPage>(d.faq);
});
export const getAuthPages = cache(async () =>
  camelize<M.AuthPages>(await fetchResource("/pages/auth", loadPage("auth"))),
);
