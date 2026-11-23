import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { getFaqPage } from "@/services/content.service";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getFaqPage()).seoTitle };
}

export default async function FaqPage() {
  const p = await getFaqPage();
  return (
    <>
      <PageHeader title={p.title} subtitle={p.subtitle} crumbs={[{ label: "FAQ'S" }]} />
      <section className="mx-auto max-w-3xl px-4 py-14">
        {p.faqs.length === 0 ? (
          <h5 className="py-16 text-center text-lg font-bold text-muted">{p.empty}</h5>
        ) : (
          <>
            {p.categories.map((c) => (
              <div key={c.id} className="mb-10">
                <h2 className="mb-3 text-xl font-bold">{c.name}</h2>
                <div className="divide-y divide-line rounded border border-line">
                  {p.faqs
                    .filter((f) => f.categoryId === c.id)
                    .map((f) => (
                      <details key={f.id} className="group p-4">
                        <summary className="cursor-pointer text-sm font-semibold marker:content-none">{f.question}</summary>
                        <p className="mt-3 text-sm leading-relaxed text-muted">{f.answer}</p>
                      </details>
                    ))}
                </div>
              </div>
            ))}
          </>
        )}
      </section>
    </>
  );
}
