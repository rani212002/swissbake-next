import Link from "next/link";
import type { ComponentProps } from "react";
import type { Link as LinkModel } from "@/types/models";

type Props = Omit<ComponentProps<"a">, "href"> & { href: string; external?: boolean };

/** next/link for internal pages, plain <a> for external URLs and files. */
export function SmartLink({ href, external, children, ...rest }: Props) {
  const isFile = /\.(pdf|zip)$/i.test(href);
  if (external || isFile || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}

export function LinkFrom({ link, ...rest }: Omit<ComponentProps<"a">, "href"> & { link: LinkModel }) {
  return (
    <SmartLink href={link.href} external={link.external} {...rest}>
      {rest.children ?? link.label}
    </SmartLink>
  );
}
