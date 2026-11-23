import { LinkFrom } from "./SmartLink";
import type { HomePage } from "@/types/models";

export function RegisterBanner({ data }: { data: HomePage["registerBanner"] }) {
  return (
    <section className="bg-brand text-white">
      <div className="mx-auto flex max-w-page flex-col items-center justify-between gap-5 px-4 py-8 text-center md:flex-row md:text-left">
        <h5 className="text-lg font-bold sm:text-xl">{data.title}</h5>
        <LinkFrom
          link={data.cta}
          className="shrink-0 rounded bg-white px-8 py-3 text-sm font-semibold text-brand hover:bg-cream"
        />
      </div>
    </section>
  );
}
