import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { SmartLink } from "@/components/SmartLink";
import { getCatalog } from "@/services/content.service";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getCatalog()).solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = (await getCatalog()).solutions.find((x) => x.slug === slug);
  return { title: s ? s.name : "Solution" };
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const catalog = await getCatalog();
  const solution = catalog.solutions.find((s) => s.slug === slug);
  if (!solution) notFound();

  return (
    <>
      <PageHeader
        title={solution.name}
        crumbs={[{ label: "Solution", href: "/solution" }, { label: solution.name }]}
      />
      <section className="mx-auto grid max-w-page gap-10 px-4 py-14 lg:grid-cols-[1fr_280px]">
        <div>
          {solution.imageUrl && (
            <Image src={solution.imageUrl} alt={solution.name} width={900} height={600} className="mb-6 h-auto w-full rounded" />
          )}
          {solution.intro ? (
            <p className="text-lg leading-relaxed">{solution.intro}</p>
          ) : (
            <p className="text-muted">Products for this application load from the products API.</p>
          )}
        </div>
        <aside>
          <h4 className="mb-3 text-sm font-bold">Applications</h4>
          <ul className="space-y-2 text-sm">
            {catalog.solutions.map((s) => (
              <li key={s.id}>
                <SmartLink href={s.href} className={s.slug === slug ? "font-bold text-brand" : "hover:text-brand"}>
                  {s.name}
                </SmartLink>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </>
  );
}
