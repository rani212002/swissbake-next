"use client";

import Image from "next/image";
import { useState } from "react";
import { SmartLink } from "./SmartLink";
import type { ProductTab } from "@/types/models";

export function ProductTabs({ tabs }: { tabs: ProductTab[] }) {
  const [active, setActive] = useState(tabs[0]?.id);
  const current = tabs.find((t) => t.id === active);
  if (tabs.length === 0) return null;

  return (
    <section className="mx-auto max-w-page px-4 py-12">
      <div role="tablist" aria-label="Product highlights" className="flex flex-wrap justify-center gap-2 border-b border-line">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            type="button"
            id={`tab-${t.id}`}
            aria-selected={t.id === active}
            aria-controls={`panel-${t.id}`}
            onClick={() => setActive(t.id)}
            className={`-mb-px border-b-2 px-5 py-3 text-sm font-semibold transition-colors ${
              t.id === active ? "border-brand text-brand" : "border-transparent text-muted hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {current && (
        <div role="tabpanel" id={`panel-${current.id}`} aria-labelledby={`tab-${current.id}`} className="pt-8">
          {current.products.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted">
              Products load here once the products API is connected.
            </p>
          ) : (
            <ul className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {current.products.map((p) => (
                <li key={p.id}>
                  <SmartLink href={p.href} className="group block">
                    <div className="relative aspect-square overflow-hidden rounded bg-cream">
                      <Image src={p.imageUrl} alt={p.name} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-contain p-4" />
                    </div>
                    <h3 className="mt-3 text-sm font-semibold group-hover:text-brand">{p.name}</h3>
                    {p.priceLabel && <p className="text-sm text-muted">{p.priceLabel}</p>}
                  </SmartLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}
