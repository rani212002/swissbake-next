import Image from "next/image";
import { LinkFrom } from "./SmartLink";
import type { HeroBanner } from "@/types/models";

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden className={className}>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

/** Banner images are pre-composed (cream backdrop, decorative icons, food photography baked in), so they're
 * displayed as-is, side by side, with just the subtitle/title/CTA overlaid. */
export function HeroSlider({ banners }: { banners: HeroBanner[] }) {
  if (banners.length === 0) return null;

  return (
    <section aria-label="Featured banners" className="bg-white">
      <div className="grid grid-cols-1 gap-px bg-line lg:grid-cols-2">
        {banners.map((b, i) => (
          <div key={b.id} className="relative aspect-[31/14] overflow-hidden bg-cream">
            <Image
              src={b.imageUrl}
              alt={b.title}
              fill
              priority={i === 0}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="relative z-10 flex h-full flex-col justify-center px-6 sm:px-10 lg:px-12">
              <div className="flex items-center gap-2">
                <span className="h-4 w-1 shrink-0 bg-brand" aria-hidden />
                <h5 className="text-xs font-bold uppercase tracking-wide text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.35)] sm:text-sm">
                  {b.subtitle}
                </h5>
              </div>
              <h2 className="mt-3 max-w-xs text-2xl font-extrabold leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)] sm:max-w-sm sm:text-3xl lg:max-w-md lg:text-4xl">
                {b.title}
              </h2>
              <LinkFrom
                link={b.cta}
                className="mt-6 inline-flex w-fit items-center gap-2 rounded bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
              >
                {b.cta.label}
                <ArrowRightIcon className="h-4 w-4" />
              </LinkFrom>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
