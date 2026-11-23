import Image from "next/image";
import { LinkFrom } from "./SmartLink";
import { Newsletter } from "./Newsletter";
import type { Site } from "@/types/models";

const SOCIAL_LABEL: Record<string, string> = {
  facebook: "f",
  instagram: "ig",
  twitter: "x",
  linkedin: "in",
  youtube: "yt",
  pinterest: "p",
};

export function Footer({ site }: { site: Site }) {
  const f = site.footer;
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-page gap-10 px-4 py-12 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Image
            src={site.brand.logoUrl}
            alt={site.brand.name}
            width={160}
            height={46}
            className="h-11 w-auto rounded bg-white p-1"
          />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80">{site.brand.footerDescription}</p>
          <Newsletter label={f.newsletterLabel} placeholder={f.newsletterPlaceholder} button={f.newsletterButton} />
        </div>

        {f.columns.map((col) => (
          <div key={col.title}>
            <h5 className="text-base font-bold">{col.title}</h5>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              {col.links.map((l) => (
                <li key={l.href}>
                  <LinkFrom link={l} className="hover:text-white hover:underline" />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-page flex-col items-center justify-between gap-5 px-4 py-6 md:flex-row">
          <div className="flex items-center gap-3">
            <h5 className="text-sm font-bold">{f.socialTitle}</h5>
            <ul className="flex gap-2">
              {f.social.map((s) => (
                <li key={s.network}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.network}
                    className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-xs font-bold uppercase hover:bg-brand"
                  >
                    {SOCIAL_LABEL[s.network] ?? s.network[0]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-center text-xs text-white/70">{site.brand.copyright}</p>
          <ul className="flex items-center gap-2">
            {f.paymentIcons.map((p) => (
              <li key={p.name}>
                <Image src={p.imageUrl} alt={p.name} width={40} height={26} className="h-6 w-auto" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
