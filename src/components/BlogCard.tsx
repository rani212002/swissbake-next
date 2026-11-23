import Image from "next/image";
import { SmartLink } from "./SmartLink";
import type { BlogArticle } from "@/types/models";

export function BlogCard({ post, readMore = "Read More" }: { post: BlogArticle; readMore?: string }) {
  return (
    <li className="flex flex-col overflow-hidden rounded bg-white shadow-sm">
      <SmartLink href={post.href} title={post.title} className="relative block aspect-[16/10] bg-cream">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </SmartLink>
      <div className="flex flex-1 flex-col p-4">
        <time dateTime={post.isoDate} className="text-xs text-muted">
          {post.dateLabel}
        </time>
        <h3 className="mt-2 line-clamp-1 text-base font-bold">
          <SmartLink href={post.href} className="hover:text-brand">
            {post.title}
          </SmartLink>
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>
        <SmartLink href={post.href} className="mt-4 text-sm font-semibold text-brand hover:underline">
          {readMore}
        </SmartLink>
      </div>
    </li>
  );
}
