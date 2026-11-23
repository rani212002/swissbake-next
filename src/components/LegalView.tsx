import { PageHeader } from "./PageHeader";
import type { LegalPage } from "@/types/models";

export function LegalView({ page }: { page: LegalPage }) {
  return (
    <>
      <PageHeader title={page.title} crumbs={[{ label: page.breadcrumb }]} />
      <article className="mx-auto max-w-3xl space-y-8 px-4 py-14 text-sm leading-relaxed">
        {page.sections.map((s, i) => (
          <section key={i} className="space-y-3">
            {s.heading && <h2 className="font-bold">{s.heading}</h2>}
            {s.paragraphs.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </section>
        ))}
      </article>
    </>
  );
}
