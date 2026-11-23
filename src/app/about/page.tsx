import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { LinkFrom } from "@/components/SmartLink";
import { getAboutPage, getHomePage } from "@/services/content.service";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getAboutPage()).seoTitle };
}

export default async function AboutPage() {
  const [p, home] = await Promise.all([getAboutPage(), getHomePage()]);
  return (
    <>
      <PageHeader title={p.title} subtitle={p.subtitle} crumbs={[{ label: "About Us" }]} />

      <section className="mx-auto grid max-w-page items-center gap-10 px-4 py-14 md:grid-cols-2">
        <div>
          <h3 className="text-sm font-bold text-brand">{p.why.eyebrow}</h3>
          <h2 className="mt-2 text-3xl font-bold">{p.why.title}</h2>
          <div className="mt-5 space-y-4 leading-relaxed text-muted">
            {p.why.paragraphs.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
        </div>
        <Image src={p.why.imageUrl} alt="About Us - Who We Are" width={640} height={480} className="h-auto w-full rounded" />
      </section>

      <section className="bg-cream">
        <div className="mx-auto grid max-w-page gap-8 px-4 py-14 md:grid-cols-2">
          {[p.vision, p.mission].map((b) => (
            <div key={b.title}>
              <h3 className="text-2xl font-bold">{b.title}</h3>
              <p className="mt-3 text-lg leading-relaxed text-muted">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand text-white">
        <div className="mx-auto flex max-w-page flex-col items-center justify-between gap-5 px-4 py-8 text-center md:flex-row md:text-left">
          <h5 className="text-lg font-bold sm:text-xl">{home.registerBanner.title}</h5>
          <LinkFrom
            link={home.registerBanner.cta}
            className="shrink-0 rounded bg-white px-8 py-3 text-sm font-semibold text-brand hover:bg-cream"
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-page items-center gap-10 px-4 py-14 md:grid-cols-2">
        <Image src={p.legacy.imageUrl} alt={p.legacy.title} width={640} height={480} className="h-auto w-full rounded" />
        <div>
          <h2 className="text-3xl font-bold">{p.legacy.title}</h2>
          <p className="mt-2 font-semibold">{p.legacy.subtitle}</p>
          <div className="mt-5 space-y-4 leading-relaxed text-muted">
            {p.legacy.paragraphs.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto grid max-w-page items-center gap-10 px-4 py-14 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold">{p.quality.title}</h2>
            <p className="mt-2 font-semibold">{p.quality.subtitle}</p>
            <div className="mt-5 space-y-4 leading-relaxed text-muted">
              {p.quality.paragraphs.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
          </div>
          <Image src={p.quality.imageUrl} alt={p.quality.title} width={640} height={480} className="h-auto w-full rounded" />
        </div>
      </section>

      <section className="mx-auto max-w-page px-4 py-14">
        <h2 className="text-center text-3xl font-bold">{p.clients.title}</h2>
        <p className="mt-2 text-center text-muted">{p.clients.subtitle}</p>
        <ul className="mt-10 grid grid-cols-2 items-center gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {p.clients.logos.map((l) => (
            <li key={l.imageUrl} className="grid h-24 place-items-center rounded border border-line bg-white p-3">
              <Image src={l.imageUrl} alt="Brands" width={160} height={80} className="max-h-16 w-auto object-contain" />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
