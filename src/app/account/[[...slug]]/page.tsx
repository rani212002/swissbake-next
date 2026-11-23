import type { Metadata } from "next";
import { SmartLink } from "@/components/SmartLink";
import { getSite } from "@/services/content.service";

export const metadata: Metadata = { title: "My Account | SwissBake", robots: { index: false } };

/** Every /account/* page requires a signed-in customer. */
export default async function AccountPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const site = await getSite();
  return (
    <section className="mx-auto max-w-page px-4 py-20">
      <h1 className="text-3xl font-bold">{site.accountMenu.title}</h1>
      <p className="mt-2 text-muted">
        Sign in to open <code>/account/{(slug ?? []).join("/")}</code>.
      </p>
      <SmartLink href="/login" className="mt-6 inline-block rounded bg-brand px-8 py-3 text-sm font-semibold text-white hover:bg-brand-dark">
        {site.guestMenu.login.label}
      </SmartLink>
      <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {site.accountMenu.items.map((i) => (
          <li key={i.label}>
            <h2 className="font-bold">{i.label}</h2>
            <ul className="mt-2 space-y-1 text-sm text-muted">
              {i.children.map((c) => (
                <li key={c.href}>{c.label}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
