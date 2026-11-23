import { SmartLink } from "@/components/SmartLink";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-page px-4 py-28 text-center">
      <h1 className="text-4xl font-bold">Page not found</h1>
      <p className="mt-3 text-muted">The page you are looking for does not exist or has moved.</p>
      <SmartLink href="/" className="mt-8 inline-block rounded bg-brand px-8 py-3 text-sm font-semibold text-white hover:bg-brand-dark">
        Back to home
      </SmartLink>
    </section>
  );
}
