"use client";

import { useState } from "react";
import type { Product } from "@/types/models";

const TABS = [
  { id: "description", label: "DESCRIPTION" },
  { id: "recipe", label: "RECIPE" },
  { id: "cost", label: "COST CALCULATOR" },
  { id: "faq", label: "FAQ'S" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function ProductDetailTabs({ product }: { product: Product }) {
  const [tab, setTab] = useState<TabId>("description");
  const [batchKg, setBatchKg] = useState("");
  const [pricePerKg, setPricePerKg] = useState("");
  const [otherCost, setOtherCost] = useState("");

  const total = (Number(batchKg) || 0) * (Number(pricePerKg) || 0) + (Number(otherCost) || 0);
  const perKg = Number(batchKg) > 0 ? total / Number(batchKg) : 0;
  const box = "w-full rounded border border-line px-3 py-2 text-sm";

  return (
    <div>
      <div role="tablist" className="flex flex-wrap gap-2 border-b border-line">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            type="button"
            id={`ptab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`ppanel-${t.id}`}
            onClick={() => setTab(t.id)}
            className={`-mb-px border-b-2 px-4 py-3 text-sm font-semibold ${
              tab === t.id ? "border-brand text-brand" : "border-transparent text-muted hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`ppanel-${tab}`} aria-labelledby={`ptab-${tab}`} className="pt-6 text-sm leading-relaxed">
        {tab === "description" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Description</h2>
            {(product.description ?? "").split("\n\n").map((p) => (
              <p key={p} className="whitespace-pre-line">
                {p}
              </p>
            ))}
            {product.keyIngredients && (
              <>
                <h3 className="pt-2 text-base font-bold">Key Ingredients</h3>
                <p>{product.keyIngredients}</p>
              </>
            )}
          </div>
        )}

        {tab === "recipe" && <p className="text-muted">Recipes for this product load from the recipes API.</p>}

        {tab === "cost" && (
          <div className="grid max-w-md gap-4">
            <label className="text-xs font-bold">
              Batch size (kg)
              <input className={`${box} mt-1 font-normal`} inputMode="decimal" value={batchKg} onChange={(e) => setBatchKg(e.target.value)} />
            </label>
            <label className="text-xs font-bold">
              Mix price per kg
              <input className={`${box} mt-1 font-normal`} inputMode="decimal" value={pricePerKg} onChange={(e) => setPricePerKg(e.target.value)} />
            </label>
            <label className="text-xs font-bold">
              Other ingredient cost per batch
              <input className={`${box} mt-1 font-normal`} inputMode="decimal" value={otherCost} onChange={(e) => setOtherCost(e.target.value)} />
            </label>
            <p className="rounded bg-cream p-4">
              <strong>Total batch cost:</strong> {total.toFixed(2)}
              <br />
              <strong>Cost per kg:</strong> {perKg.toFixed(2)}
            </p>
          </div>
        )}

        {tab === "faq" && <p className="text-muted">No FAQ found for this product.</p>}
      </div>
    </div>
  );
}
