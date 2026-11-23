import Image from "next/image";
import { LinkFrom, SmartLink } from "./SmartLink";
import type { HomePage } from "@/types/models";

export function PopularCategories({ data }: { data: HomePage["popularCategories"] }) {
  return (
    <section className="bg-cream py-14">
      <div className="mx-auto max-w-page px-4">
        <h2 className="text-center text-3xl font-bold">{data.title}</h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-muted">{data.subtitle}</p>

        <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
          {data.items.map((c) => (
            <li key={c.id}>
              <SmartLink
                href={c.href}
                title={c.name}
                className="group relative flex h-40 items-end overflow-hidden rounded bg-white p-4 ring-1 ring-line transition-shadow hover:shadow-md sm:h-48"
              >
                {c.imageUrl && (
                  <Image src={c.imageUrl} alt="" fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" />
                )}
                <span
                  className={`relative text-sm font-bold group-hover:text-brand sm:text-base ${
                    c.imageUrl ? "rounded bg-white/90 px-3 py-1" : ""
                  }`}
                >
                  {c.name}
                </span>
              </SmartLink>
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
