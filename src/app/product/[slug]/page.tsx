import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { ProductDetailTabs } from "@/components/ProductDetailTabs";
import { SmartLink } from "@/components/SmartLink";
import { getProduct, getProducts } from "@/services/content.service";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProduct(slug);
  return p ? { title: `${p.name} | SwissBake`, description: p.description?.slice(0, 160) } : {};
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <PageHeader title={product.name} crumbs={[{ label: "Category", href: "/category" }, { label: product.name }]} />
      <section className="mx-auto grid max-w-page gap-10 px-4 py-14 lg:grid-cols-[360px_1fr]">
        <div>
          <div className="relative aspect-square overflow-hidden rounded bg-cream">
            <Image src={product.imageUrl} alt={product.name} fill sizes="360px" priority className="object-contain p-6" />
          </div>
          <SmartLink
            href="/contactUs"
            className="mt-5 block rounded bg-brand px-6 py-3 text-center text-sm font-semibold text-white hover:bg-brand-dark"
          >
            Request for sample
          </SmartLink>
        </div>
        <ProductDetailTabs product={product} />
      </section>
    </>
  );
}
