import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { SmartLink } from "@/components/SmartLink";
import { getBlog, getBlogPost } from "@/services/content.service";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getBlog()).posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await getBlogPost(slug);
  return p ? { title: `${p.title} | SwissBake`, description: p.excerpt, openGraph: { images: [p.imageUrl] } } : {};
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const related = (await getBlog()).posts.filter((p) => p.id !== post.id && p.categories.some((c) => post.categories.includes(c))).slice(0, 4);

  return (
    <>
      <PageHeader title={post.title} crumbs={[{ label: "Blog", href: "/blogcategory/all" }, { label: post.title }]} />
      <article className="mx-auto max-w-3xl px-4 py-12">
        <time dateTime={post.isoDate} className="text-sm text-muted">
          {post.dateLabel}
        </time>
        <div className="relative mt-4 aspect-[16/9] overflow-hidden rounded bg-cream">
          <Image src={post.imageUrl} alt={post.title} fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
        </div>
        <p className="mt-8 text-lg leading-relaxed">{post.excerpt.replace(/\.\.\.$/, "")}</p>
        {post.body ? (
          <div className="mt-6 space-y-4 leading-relaxed">
            {post.body.split(/\n{2,}/).map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
        ) : (
          <p className="mt-6 rounded bg-cream p-4 text-sm text-muted">
            The full article text loads from the blog API (field <code>body</code>).
          </p>
        )}
      </article>

      {related.length > 0 && (
        <section className="bg-cream py-12">
          <div className="mx-auto max-w-page px-4">
            <h2 className="text-center text-2xl font-bold">More articles</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => (
                <li key={r.id} className="rounded bg-white p-4 shadow-sm">
                  <time className="text-xs text-muted">{r.dateLabel}</time>
                  <h3 className="mt-1 line-clamp-2 text-sm font-bold">
                    <SmartLink href={r.href} className="hover:text-brand">
                      {r.title}
                    </SmartLink>
                  </h3>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
