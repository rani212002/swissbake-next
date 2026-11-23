"use client";

import { useState, useTransition } from "react";
import { subscribeToNewsletter } from "@/app/actions";

type Props = { label: string; placeholder: string; button: string };

export function Newsletter({ label, placeholder, button }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [pending, start] = useTransition();

  return (
    <form
      className="mt-6"
      onSubmit={(e) => {
        e.preventDefault();
        start(async () => {
          const { ok } = await subscribeToNewsletter(email.trim());
          setStatus(ok ? "ok" : "error");
          if (ok) setEmail("");
        });
      }}
    >
      <label htmlFor="newsletter-email" className="text-sm font-bold">
        {label}
      </label>
      <div className="mt-2 flex max-w-sm">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setStatus("idle");
          }}
          placeholder={placeholder}
          className="min-w-0 flex-1 rounded-l border border-white/30 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/60"
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded-r bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark disabled:opacity-60"
        >
          {button}
        </button>
      </div>
      <p role="status" className="mt-2 min-h-5 text-xs">
        {status === "ok" && "Thank you for subscribing."}
        {status === "error" && "Enter a valid email address and try again."}
      </p>
    </form>
  );
}
