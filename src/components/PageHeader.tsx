import { SmartLink } from "./SmartLink";

type Crumb = { label: string; href?: string };

export function PageHeader({ title, subtitle, crumbs }: { title: string; subtitle?: string; crumbs?: Crumb[] }) {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-page px-4 py-12 text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-3 max-w-2xl text-muted">{subtitle}</p>}
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mt-5">
            <ol className="flex flex-wrap justify-center gap-2 text-xs font-semibold">
              <li>
                <SmartLink href="/" className="text-brand hover:underline">
                  Home
                </SmartLink>
              </li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex gap-2">
                  <span aria-hidden className="text-muted">/</span>
                  {c.href ? (
                    <SmartLink href={c.href} className="text-brand hover:underline">
                      {c.label}
                    </SmartLink>
                  ) : (
                    <span aria-current="page">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
      </div>
    </section>
  );
}
