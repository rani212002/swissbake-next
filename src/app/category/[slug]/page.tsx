import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { SmartLink } from "@/components/SmartLink";
import { getCatalog, getProducts } from "@/services/content.service";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getCatalog()).categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = (await getCatalog()).categories.find((x) => x.slug === slug);
  if (!c) return {};
  return { title: c.seoTitle ?? c.name, description: c.seoDescription ?? undefined };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const [catalog, allProducts] = await Promise.all([getCatalog(), getProducts()]);
  const category = catalog.categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const products = [...category.products, ...allProducts.filter((p) => p.categorySlug === slug)];

  return (
    <>
      <PageHeader
        title={category.seoTitle ?? category.name}
        subtitle={category.seoDescription ?? undefined}
        crumbs={[{ label: "Category", href: "/category" }, { label: category.name }]}
      />
      <section className="mx-auto grid max-w-page gap-10 px-4 py-14 lg:grid-cols-[260px_1fr]">
        <aside>
          <h4 className="mb-3 text-sm font-bold">{catalog.categoryPage.sidebarTitle}</h4>
          <ul className="space-y-2 text-sm">
            {catalog.categories.map((c) => (
              <li key={c.id}>
                <SmartLink href={c.href} className={c.slug === slug ? "font-bold text-brand" : "hover:text-brand"}>
                  {c.name}
                </SmartLink>
              </li>
            ))}
          </ul>
        </aside>

        <div>
          {category.intro && <p className="mb-8 text-lg leading-relaxed">{category.intro}</p>}
          {products.length === 0 ? (
            <p className="rounded bg-cream p-6 text-sm text-muted">{catalog.categoryPage.emptyProducts}</p>
          ) : (
            <ul className="grid grid-cols-2 gap-6 md:grid-cols-3">
              {products.map((p) => (
                <li key={p.id}>
                  <SmartLink href={p.href} className="group block">
                    <div className="relative aspect-square overflow-hidden rounded bg-cream">
                      <Image src={p.imageUrl} alt={p.name} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-contain p-4" />
                    </div>
                    <h3 className="mt-3 text-sm font-semibold group-hover:text-brand">{p.name}</h3>
                  </SmartLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
