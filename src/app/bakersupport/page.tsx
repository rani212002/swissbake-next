import type { Metadata } from "next";
import Image from "next/image";
import { BakerSupportForm } from "@/components/Forms";
import { PageHeader } from "@/components/PageHeader";
import { LinkFrom } from "@/components/SmartLink";
import { getBakerSupportPage, getHomePage } from "@/services/content.service";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getBakerSupportPage()).seoTitle };
}

export default async function BakerSupportPage() {
  const [p, home] = await Promise.all([getBakerSupportPage(), getHomePage()]);
  return (
    <>
      <PageHeader title={p.title} subtitle={p.subtitle} crumbs={[{ label: "Baker Support" }]} />

      <section className="mx-auto max-w-page px-4 py-14">
        <h2 className="text-center text-3xl font-bold">{p.services.title}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center italic text-muted">{p.services.quote}</p>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {p.services.items.map((s) => (
            <div key={s.title} className="rounded border border-line p-6">
              <h4 className="text-lg font-bold">{s.title}</h4>
              <p className="mt-3 text-sm leading-relaxed text-muted">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand text-white">
        <div className="mx-auto flex max-w-page flex-col items-center justify-between gap-5 px-4 py-8 text-center md:flex-row md:text-left">
          <h5 className="text-lg font-bold sm:text-xl">{home.registerBanner.title}</h5>
          <LinkFrom link={home.registerBanner.cta} className="shrink-0 rounded bg-white px-8 py-3 text-sm font-semibold text-brand hover:bg-cream" />
        </div>
      </section>

      <section className="mx-auto grid max-w-page gap-10 px-4 py-14 lg:grid-cols-[1fr_2fr]">
        <div>
          <h2 className="text-3xl font-bold">{p.form.title}</h2>
          <p className="mt-3 leading-relaxed text-muted">{p.form.subtitle}</p>
          <Image src={p.form.imageUrl} alt="" width={420} height={420} className="mt-6 hidden h-auto w-full rounded lg:block" />
        </div>
        <BakerSupportForm form={p.form} />
      </section>
    </>
  );
}
