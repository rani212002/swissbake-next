import Image from "next/image";
import { LinkFrom, SmartLink } from "./SmartLink";
import type { HomePage } from "@/types/models";

export function Applications({ data }: { data: HomePage["applications"] }) {
  return (
    <section className="mx-auto max-w-page px-4 py-14">
      <h2 className="text-center text-3xl font-bold">{data.title}</h2>
      <p className="mx-auto mt-2 max-w-xl text-center text-muted">{data.subtitle}</p>

      <ul className="mt-10 grid gap-8 md:grid-cols-3">
        {data.items.map((a) => (
          <li key={a.id} className="flex flex-col">
            <SmartLink href={a.href} className="relative block aspect-[4/3] overflow-hidden rounded bg-cream">
              <Image
                src={a.imageUrl}
                alt={a.name}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </SmartLink>
            <h3 className="mt-4 text-lg font-bold">
              <SmartLink href={a.href} className="hover:text-brand">
                {a.name}
              </SmartLink>
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{a.description}</p>
          </li>
        ))}
      </ul>

      <div className="mt-10 text-center">
        <LinkFrom
          link={data.viewAll}
          className="inline-block rounded border border-brand px-8 py-3 text-sm font-semibold text-brand hover:bg-brand hover:text-white"
        />
      </div>
    </section>
  );
}
