import type { Metadata } from "next";
import { LoginForm } from "@/components/Forms";
import { SmartLink } from "@/components/SmartLink";
import { getAuthPages } from "@/services/content.service";

export const metadata: Metadata = { title: "Login | SwissBake" };

export default async function LoginPage() {
  const { login } = await getAuthPages();
  return (
    <section className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-3xl font-bold">{login.title}</h1>
      <p className="mt-2 text-muted">{login.subtitle}</p>
      <div className="mt-8">
        <LoginForm page={login} />
      </div>
      <p className="mt-6 text-sm">
        {login.altText}{" "}
        <SmartLink href={login.altLink.url} className="font-semibold text-brand hover:underline">
          {login.altLink.label}
        </SmartLink>
      </p>
    </section>
  );
}
