import type { Metadata } from "next";
import { SmartLink } from "@/components/SmartLink";

export const metadata: Metadata = { title: "Checkout | SwissBake" };

export default function CheckoutPage() {
  return (
    <section className="mx-auto max-w-page px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Checkout</h1>
      <p className="mt-3 text-muted">Please sign in to review your cart and place an order.</p>
      <SmartLink href="/login" className="mt-8 inline-block rounded bg-brand px-8 py-3 text-sm font-semibold text-white hover:bg-brand-dark">
        Login Now
      </SmartLink>
    </section>
  );
}
