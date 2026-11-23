"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LinkFrom, SmartLink } from "./SmartLink";
import type { Site } from "@/types/models";

function DocumentIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden className={props.className}>
      <path d="M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M14 3v4h4" />
    </svg>
  );
}

function PhoneIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden className={props.className}>
      <path d="M4.5 4h3.3l1.4 4.2-1.9 1.6a12 12 0 0 0 5.9 5.9l1.6-1.9 4.2 1.4v3.3a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 3 5.6 1.5 1.5 0 0 1 4.5 4Z" />
    </svg>
  );
}

function MailIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden className={props.className}>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m3.5 6 8.5 7 8.5-7" />
    </svg>
  );
}

function UserIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden className={props.className}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    </svg>
  );
}

function BellIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden className={props.className}>
      <path d="M18 16v-5a6 6 0 1 0-12 0v5l-1.5 2.5h15L18 16Z" />
      <path d="M10 21a2 2 0 0 0 4 0" />
    </svg>
  );
}

function CartIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden className={props.className}>
      <path d="M3 4h2l2.4 11h10.2L20 7H6.2" />
      <circle cx="9" cy="19" r="1.5" />
      <circle cx="17" cy="19" r="1.5" />
    </svg>
  );
}

function ChevronDownIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className={props.className}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function SearchIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className={props.className}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export function Header({ site }: { site: Site }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [query, setQuery] = useState("");

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `${site.search.actionHref}?q=${encodeURIComponent(q)}` : site.search.actionHref);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCartOpen(false);
        setAccountOpen(false);
        setMegaOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const { topBar, contact, cart } = site;

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      {/* Accent stripe */}
      <div className="h-1 bg-[#c4e1c5]" aria-hidden />

      {/* Top bar */}
      <div className="bg-ink text-xs text-white">
        <div className="mx-auto flex max-w-page items-center justify-between gap-4 px-4 py-2">
          <LinkFrom
            link={{ label: topBar.catalogLabel, href: contact.catalogHref, external: false }}
            className="inline-flex items-center gap-1.5 font-medium hover:text-white/80"
          >
            <DocumentIcon className="h-4 w-4" />
            {topBar.catalogLabel}
          </LinkFrom>
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="inline-flex items-center gap-1.5">
              {topBar.orderLabel}
              <PhoneIcon className="h-3.5 w-3.5" />
              <a href={contact.orderPhoneHref} className="font-semibold hover:underline">
                {contact.orderPhone}
              </a>
            </span>
            <SmartLink href={contact.emailUsHref} className="hidden items-center gap-1.5 hover:underline sm:inline-flex">
              <MailIcon className="h-4 w-4" />
              {topBar.emailLabel}
            </SmartLink>
            <SmartLink href={topBar.signInHref} className="inline-flex items-center gap-1.5 font-semibold hover:underline">
              <UserIcon className="h-4 w-4" />
              {topBar.signInLabel}
            </SmartLink>
          </div>
        </div>
      </div>

      {/* Logo row */}
      <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-3 px-4 py-3 lg:flex-nowrap">
        <button
          type="button"
          className="rounded border border-line px-3 py-2 text-sm font-medium lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="main-nav"
          onClick={() => setMobileOpen((v) => !v)}
        >
          Menu
        </button>

        <SmartLink href="/" className="shrink-0">
          <Image
            src={site.brand.logoUrl}
            alt={site.brand.name}
            width={180}
            height={52}
            priority
            className="h-12 w-auto"
          />
        </SmartLink>

        <div className="order-last flex w-full items-center gap-2 sm:gap-3 lg:order-none lg:w-auto lg:flex-1 lg:justify-center lg:px-6">
          {site.headerButtons.map((b) => (
            <LinkFrom
              key={b.label}
              link={b}
              className={
                b.variant === "primary"
                  ? "hidden shrink-0 rounded bg-brand px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark sm:inline-block"
                  : "hidden shrink-0 rounded border border-brand px-5 py-2 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-white sm:inline-block"
              }
            />
          ))}

          <form onSubmit={handleSearch} role="search" className="flex min-w-0 flex-1 lg:max-w-md">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={site.search.placeholder}
              aria-label={site.search.placeholder}
              className="w-full min-w-0 rounded-l border border-brand px-4 py-2 text-sm uppercase tracking-wide text-ink placeholder:text-muted focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Search"
              className="flex shrink-0 items-center justify-center rounded-r bg-brand px-4 text-white transition-colors hover:bg-brand-dark"
            >
              <SearchIcon className="h-4 w-4" />
            </button>
          </form>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notifications */}
          <button
            type="button"
            aria-label="Notifications"
            className="hidden h-10 w-10 place-items-center rounded-full text-muted hover:bg-cream sm:grid"
          >
            <BellIcon className="h-5 w-5" />
          </button>

          {/* Cart */}
          <button
            type="button"
            aria-label="Cart"
            onClick={() => {
              setCartOpen(true);
              setAccountOpen(false);
            }}
            className="relative flex h-10 items-center gap-1.5 rounded-full px-1 text-muted hover:bg-cream"
          >
            <CartIcon className="h-5 w-5" />
            <span className="hidden text-sm font-semibold uppercase tracking-wide sm:inline">{cart.title}</span>
            {cart.items.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1 text-[11px] font-bold text-white">
                {cart.items.length}
              </span>
            )}
          </button>

          {/* Account */}
          <div className="relative">
            <button
              type="button"
              aria-label="Account"
              aria-expanded={accountOpen}
              onClick={() => {
                setAccountOpen((v) => !v);
                setCartOpen(false);
              }}
              className="grid h-10 w-10 place-items-center rounded-full text-muted hover:bg-cream"
            >
              <UserIcon className="h-5 w-5" />
            </button>
            {accountOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded border border-line bg-white p-4 shadow-lg">
                <h6 className="text-sm font-semibold">{site.guestMenu.existingCustomersTitle}</h6>
                <LinkFrom
                  link={site.guestMenu.login}
                  className="mt-2 block rounded bg-brand px-4 py-2 text-center text-sm font-semibold text-white hover:bg-brand-dark"
                />
                <h6 className="mt-4 text-sm font-semibold">{site.guestMenu.newCustomersTitle}</h6>
                <LinkFrom
                  link={site.guestMenu.register}
                  className="mt-2 block rounded border border-brand px-4 py-2 text-center text-sm font-semibold text-brand hover:bg-brand hover:text-white"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav
        id="main-nav"
        aria-label="Main"
        className={`border-t border-b border-line bg-white ${mobileOpen ? "block" : "hidden"} lg:block`}
      >
        <ul className="mx-auto flex max-w-page flex-col px-4 lg:flex-row lg:items-center lg:justify-center lg:gap-1">
          {site.mainNav.map((item) => {
            const active = isActive(item.href);
            const linkClassName = `relative inline-flex items-center gap-1 px-4 py-3 text-sm font-semibold uppercase tracking-wide transition-colors ${
              active ? "text-ink" : "text-[#a7b7bf] hover:text-brand"
            }`;
            return item.megaMenu ? (
              <li
                key={item.label}
                className="lg:static"
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
              >
                <div className="flex items-center">
                  <LinkFrom link={item} className={linkClassName}>
                    {item.label}
                    <ChevronDownIcon className="hidden h-3 w-3 lg:inline-block" />
                    {active && <span className="absolute inset-x-4 -bottom-px h-0.5 bg-brand" aria-hidden />}
                  </LinkFrom>
                  <button
                    type="button"
                    aria-label={`Toggle ${item.label} menu`}
                    aria-expanded={megaOpen}
                    onClick={() => setMegaOpen((v) => !v)}
                    className="px-2 py-3 lg:hidden"
                  >
                    <ChevronDownIcon className="h-3 w-3" />
                  </button>
                </div>
                {megaOpen && (
                  <div className="left-0 right-0 border-t border-line bg-white shadow-lg lg:absolute">
                    <div className="mx-auto grid max-w-page grid-cols-1 gap-x-8 gap-y-2 px-4 py-6 sm:grid-cols-2 lg:grid-cols-5">
                      {item.megaMenu.columns.map((col, i) => (
                        <ul key={i} className="space-y-2">
                          {col.map((l) => (
                            <li key={l.href}>
                              <LinkFrom link={l} className="text-sm hover:text-brand" />
                            </li>
                          ))}
                        </ul>
                      ))}
                    </div>
                    <div className="mx-auto max-w-page px-4 pb-5">
                      <LinkFrom
                        link={item.megaMenu.viewAll}
                        className="text-sm font-semibold text-brand hover:underline"
                      />
                    </div>
                  </div>
                )}
              </li>
            ) : (
              <li key={item.label}>
                <LinkFrom link={item} className={linkClassName}>
                  {item.label}
                  {active && <span className="absolute inset-x-4 -bottom-px h-0.5 bg-brand" aria-hidden />}
                </LinkFrom>
              </li>
            );
          })}
          <li className="flex gap-2 py-3 sm:hidden">
            {site.headerButtons.map((b) => (
              <LinkFrom
                key={b.label}
                link={b}
                className="flex-1 rounded border border-brand px-4 py-2 text-center text-sm font-semibold text-brand"
              />
            ))}
          </li>
        </ul>
      </nav>

      {/* Cart drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={cart.title}>
          <button
            type="button"
            aria-label="Close cart"
            className="absolute inset-0 bg-black/40"
            onClick={() => setCartOpen(false)}
          />
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h4 className="text-lg font-bold">{cart.title}</h4>
              <button type="button" aria-label="Close cart" className="text-2xl leading-none" onClick={() => setCartOpen(false)}>
                ×
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {cart.items.length === 0 ? (
                <p className="text-sm text-muted">
                  {cart.emptyMessage}{" "}
                  <LinkFrom
                    link={cart.emptyLink}
                    className="font-semibold text-brand hover:underline"
                    onClick={() => setCartOpen(false)}
                  />
                </p>
              ) : (
                <ul className="space-y-4">
                  {cart.items.map((i) => (
                    <li key={i.id} className="flex gap-3">
                      <Image src={i.imageUrl} alt="" width={64} height={64} className="h-16 w-16 rounded object-cover" />
                      <div className="text-sm">
                        <strong>
                          {i.productName} X({i.qty})
                        </strong>
                        <p>Amount: {i.amountLabel}</p>
                        <p>Weight: {i.weightLabel}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex items-center justify-between border-t border-line px-5 py-4">
              <p className="text-sm">
                <strong>{cart.grandTotalLabel}</strong> {cart.totalLabel}
              </p>
              <SmartLink
                href={cart.checkoutHref}
                className="rounded bg-brand px-5 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
              >
                {cart.checkoutLabel}
              </SmartLink>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}
