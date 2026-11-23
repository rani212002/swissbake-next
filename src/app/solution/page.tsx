import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { SmartLink } from "@/components/SmartLink";
import { getCatalog } from "@/services/content.service";

export const metadata: Metadata = { title: "Solution" };

export default async function SolutionIndex() {
  const { solutionPage, solutions } = await getCatalog();
  return (
    <>
      <PageHeader title={solutionPage.title} subtitle={solutionPage.subtitle} crumbs={[{ label: "Solution" }]} />
      <section className="mx-auto max-w-page px-4 py-14">
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {solutions.map((s) => (
            <li key={s.id}>
              <SmartLink
                href={s.href}
                className="group relative flex h-44 items-end overflow-hidden rounded bg-cream p-4 ring-1 ring-line transition-shadow hover:shadow-md"
              >
                {s.imageUrl && <Image src={s.imageUrl} alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />}
                <span className={`relative text-sm font-bold group-hover:text-brand ${s.imageUrl ? "rounded bg-white/90 px-3 py-1" : ""}`}>
                  {s.name}
                </span>
              </SmartLink>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
