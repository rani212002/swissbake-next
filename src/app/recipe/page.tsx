import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { SmartLink } from "@/components/SmartLink";
import { getRecipePage } from "@/services/content.service";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getRecipePage()).seoTitle };
}

export default async function RecipePage() {
  const p = await getRecipePage();
  return (
    <>
      <PageHeader title={p.title} subtitle={p.subtitle} crumbs={[{ label: "Recipe" }]} />
      <section className="mx-auto max-w-page px-4 py-14">
        {p.recipes.length === 0 ? (
          <h5 className="py-16 text-center text-lg font-bold text-muted">{p.empty}</h5>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {p.recipes.map((r) => (
              <li key={r.id} className="overflow-hidden rounded bg-white shadow-sm">
                <SmartLink href={`/recipe/${r.slug}`} className="relative block aspect-[4/3] bg-cream">
                  <Image src={r.imageUrl} alt={r.altText} fill sizes="25vw" className="object-cover" />
                </SmartLink>
                <div className="p-4">
                  <h2 className="line-clamp-2 text-base font-bold">
                    <SmartLink href={`/recipe/${r.slug}`} className="hover:text-brand">
                      {r.name}
                    </SmartLink>
                  </h2>
                  <SmartLink href={`/recipe/${r.slug}`} className="mt-3 inline-block text-sm font-semibold text-brand hover:underline">
                    Read More
                  </SmartLink>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
