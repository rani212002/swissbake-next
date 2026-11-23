import type { Metadata } from "next";
import { ContactForm } from "@/components/Forms";
import { PageHeader } from "@/components/PageHeader";
import { getContactPage } from "@/services/content.service";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getContactPage()).seoTitle };
}

export default async function ContactPage() {
  const p = await getContactPage();
  return (
    <>
      <PageHeader title={p.title} subtitle={p.subtitle} crumbs={[{ label: "Contact US" }]} />
      <section className="mx-auto max-w-page px-4 py-14">
        <h3 className="mx-auto max-w-3xl text-center text-xl font-semibold leading-relaxed">{p.intro}</h3>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-5 text-2xl font-bold">{p.form.title}</h2>
            <ContactForm form={p.form} />
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded border border-line">
            <iframe
              src={p.mapEmbedUrl}
              title="SwissBake office location"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0"
            />
          </div>
        </div>

        <div className="mt-14 grid gap-8 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {p.offices.map((o) => (
            <div key={o.title}>
              <h4 className="font-bold">{o.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted">{o.address}</p>
              <a href={`mailto:${o.email}`} className="mt-2 block text-sm text-brand hover:underline">
                {o.email}
              </a>
              <a href={o.websiteUrl} className="mt-2 block text-sm font-bold hover:text-brand">
                {o.websiteLabel}
              </a>
            </div>
          ))}
          <div>
            <h4 className="font-bold">{p.support.title}</h4>
            <ul className="mt-2 space-y-1 text-sm">
              {p.support.phones.map((ph) => (
                <li key={ph.label}>
                  <a href={`https://api.whatsapp.com/send?phone=${ph.whatsapp}`} className="text-brand hover:underline">
                    {ph.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${p.support.email}`} className="text-muted hover:underline">
                  {p.support.email}
                </a>
              </li>
            </ul>
            <h4 className="mt-5 font-bold">{p.follow.title}</h4>
            <ul className="mt-2 flex gap-2">
              {p.follow.links.map((l) => (
                <li key={l.network}>
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={l.network}
                    className="grid h-8 w-8 place-items-center rounded-full bg-ink text-xs font-bold uppercase text-white hover:bg-brand"
                  >
                    {l.network === "linkedin" ? "in" : l.network === "twitter" ? "x" : l.network[0]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
