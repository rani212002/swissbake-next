"use client";

import { useActionState, useState } from "react";
import {
  loginAction,
  registerAction,
  submitBakerSupport,
  submitContact,
  type FormResult,
} from "@/app/actions";
import type { AuthPages, BakerSupportPage, ContactPage } from "@/types/models";

const input =
  "w-full rounded border border-line bg-white px-3 py-2.5 text-sm placeholder:text-muted focus:border-brand";
const btn =
  "rounded bg-brand px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-60";

function Status({ state }: { state: FormResult | null }) {
  return (
    <p role="status" className={`min-h-5 text-sm ${state?.ok ? "text-green-700" : "text-brand"}`}>
      {state?.message}
    </p>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-xs font-bold tracking-wide">
      {label}
      <div className="mt-1 font-normal">{children}</div>
    </label>
  );
}

export function ContactForm({ form }: { form: ContactPage["form"] }) {
  const [state, action, pending] = useActionState(submitContact, null);
  return (
    <form action={action} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Name" aria-label="Name" className={input} />
        <input name="email" type="email" required placeholder="Email" aria-label="Email" className={input} />
        <input name="phone" type="tel" placeholder="Phone" aria-label="Phone" className={input} />
        <select name="state" defaultValue="" aria-label="State" className={input}>
          <option value="">{form.statePlaceholder}</option>
          {form.states.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <textarea name="message" required rows={5} placeholder="Message" aria-label="Message" className={input} />
      <button type="submit" disabled={pending} className={btn}>
        {form.submitLabel}
      </button>
      <Status state={state} />
    </form>
  );
}

export function BakerSupportForm({ form }: { form: BakerSupportPage["form"] }) {
  const [state, action, pending] = useActionState(submitBakerSupport, null);
  const [tabId, setTabId] = useState(form.tabs[0].id);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const tab = form.tabs.find((t) => t.id === tabId) ?? form.tabs[0];

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="request_type" value={tab.id} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={form.fields.name}>
          <input name="name" required className={input} />
        </Field>
        <Field label={form.fields.company}>
          <input name="company" required className={input} />
        </Field>
        <Field label={form.fields.country}>
          <input name="country" className={input} />
        </Field>
        <Field label={form.fields.email}>
          <input name="email" type="email" required className={input} />
        </Field>
        <Field label={form.fields.phone}>
          <input name="phone" type="tel" className={input} />
        </Field>
      </div>

      <div role="tablist" className="flex flex-wrap gap-2 border-b border-line">
        {form.tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={t.id === tabId}
            onClick={() => setTabId(t.id)}
            className={`-mb-px border-b-2 px-4 py-3 text-xs font-bold ${
              t.id === tabId ? "border-brand text-brand" : "border-transparent text-muted hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" className="space-y-4">
        {tab.fields.map((f) => {
          const key = `${tab.id}_${f.id}`;
          return (
            <Field key={key} label={f.label}>
              {f.type === "textarea" ? (
                <>
                  <textarea
                    name={f.id}
                    rows={3}
                    maxLength={f.max}
                    onChange={(e) => setCounts((c) => ({ ...c, [key]: e.target.value.length }))}
                    className={input}
                  />
                  {f.max && (
                    <span className="mt-1 block text-right text-xs text-muted">
                      {f.max - (counts[key] ?? 0)}/{f.max}
                    </span>
                  )}
                </>
              ) : (
                <input name={f.id} className={input} />
              )}
            </Field>
          );
        })}
      </div>

      <button type="submit" disabled={pending} className={btn}>
        {form.submitLabel}
      </button>
      <Status state={state} />
    </form>
  );
}

export function LoginForm({ page }: { page: AuthPages["login"] }) {
  const [state, action, pending] = useActionState(loginAction, null);
  return (
    <form action={action} className="space-y-4">
      <Field label={page.email}>
        <input name="email" type="email" required autoComplete="email" className={input} />
      </Field>
      <Field label={page.password}>
        <input name="password" type="password" required autoComplete="current-password" className={input} />
      </Field>
      <button type="submit" disabled={pending} className={`${btn} w-full`}>
        {page.submit}
      </button>
      <Status state={state} />
    </form>
  );
}

export function RegisterForm({ page }: { page: AuthPages["register"] }) {
  const [state, action, pending] = useActionState(registerAction, null);
  return (
    <form action={action} className="space-y-4">
      <Field label={page.fields.name}>
        <input name="name" required autoComplete="name" className={input} />
      </Field>
      <Field label={page.fields.company}>
        <input name="company" autoComplete="organization" className={input} />
      </Field>
      <Field label={page.fields.email}>
        <input name="email" type="email" required autoComplete="email" className={input} />
      </Field>
      <Field label={page.fields.phone}>
        <input name="phone" type="tel" autoComplete="tel" className={input} />
      </Field>
      <Field label={page.fields.password}>
        <input name="password" type="password" required minLength={6} autoComplete="new-password" className={input} />
      </Field>
      <button type="submit" disabled={pending} className={`${btn} w-full`}>
        {page.submit}
      </button>
      <Status state={state} />
    </form>
  );
}
