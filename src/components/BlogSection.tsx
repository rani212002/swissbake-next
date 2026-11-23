import Image from "next/image";
import { LinkFrom, SmartLink } from "./SmartLink";
import type { HomePage } from "@/types/models";

export function BlogSection({ data }: { data: HomePage["blogSection"] }) {
  return (
    <section className="relative isolate overflow-hidden bg-cream py-14">
      <Image
        src={data.backgroundImageUrl}
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover opacity-20"
      />
      <div className="mx-auto max-w-page px-4">
        <h2  className="text-center text-3xl font-bold">{data.title}</h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-muted">{data.subtitle}</p>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.posts.map((p) => (
            <li key={p.id} className="flex flex-col overflow-hidden rounded bg-white shadow-sm">
              <SmartLink href={p.href} title={p.title} className="relative block aspect-[16/10] bg-cream">
                <Image src={p.imageUrl} alt={p.title} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
              </SmartLink>
              <div className="flex flex-1 flex-col p-4">
                <time dateTime={p.isoDate} className="text-xs text-muted">
                  {p.dateLabel}
                </time>
                <h3 className="mt-2 line-clamp-1 text-base font-bold">
                  <SmartLink href={p.href} className="hover:text-brand">
                    {p.title}
                  </SmartLink>
                </h3>
                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">{p.excerpt}</p>
                <SmartLink href={p.href} className="mt-4 text-sm font-semibold text-brand hover:underline">
                  {data.readMoreLabel}
                </SmartLink>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <LinkFrom
            link={data.viewAll}
            className="inline-block rounded bg-brand px-8 py-3 text-sm font-semibold text-white hover:bg-brand-dark"
          />
        </div>
      </div>
    </section>
  );
}
