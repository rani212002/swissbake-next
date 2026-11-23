import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/BlogCard";
import { PageHeader } from "@/components/PageHeader";
import { SmartLink } from "@/components/SmartLink";
import { getBlog, getBlogListing } from "@/services/content.service";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getBlog()).categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const l = await getBlogListing(slug);
  return l ? { title: l.category.seoTitle } : {};
}

export default async function BlogCategoryPage({ params }: Props) {
  const { slug } = await params;
  const listing = await getBlogListing(slug);
  if (!listing) notFound();
  const { blog, category, posts } = listing;

  return (
    <>
      <PageHeader title={blog.page.title} subtitle={blog.page.subtitle} crumbs={[{ label: category.label }]} />
      <section className="mx-auto max-w-page px-4 py-12">
        <nav aria-label="Blog categories" className="flex flex-wrap justify-center gap-2 border-b border-line pb-4">
          {blog.categories.map((c) => (
            <SmartLink
              key={c.id}
              href={c.href}
              aria-current={c.id === category.id ? "page" : undefined}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                c.id === category.id ? "bg-brand text-white" : "bg-cream hover:bg-line"
              }`}
            >
              {c.label}
            </SmartLink>
          ))}
        </nav>

        {posts.length === 0 ? (
          <p className="py-16 text-center text-muted">No articles in this category yet.</p>
        ) : (
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {posts.map((p) => (
              <BlogCard key={p.id} post={p} />
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
