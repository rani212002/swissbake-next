import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { SmartLink } from "@/components/SmartLink";
import { getCatalog } from "@/services/content.service";

export async function generateMetadata(): Promise<Metadata> {
  const { categoryPage } = await getCatalog();
  return { title: categoryPage.seoTitle, description: categoryPage.seoDescription };
}

export default async function CategoryIndex() {
  const { categoryPage, categories } = await getCatalog();
  return (
    <>
      <PageHeader title={categoryPage.title} subtitle={categoryPage.subtitle} crumbs={[{ label: "Category" }]} />
      <section className="mx-auto max-w-page px-4 py-14">
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((c) => (
            <li key={c.id}>
              <SmartLink
                href={c.href}
                className="group relative flex h-40 items-end overflow-hidden rounded bg-cream p-4 ring-1 ring-line transition-shadow hover:shadow-md"
              >
                {c.imageUrl && <Image src={c.imageUrl} alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />}
                <span className="relative text-sm font-bold group-hover:text-brand">{c.name}</span>
              </SmartLink>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
