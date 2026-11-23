import type { Metadata } from "next";
import { RegisterForm } from "@/components/Forms";
import { SmartLink } from "@/components/SmartLink";
import { getAuthPages } from "@/services/content.service";

export const metadata: Metadata = { title: "Create Account | SwissBake" };

export default async function RegisterPage() {
  const { register } = await getAuthPages();
  return (
    <section className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-3xl font-bold">{register.title}</h1>
      <p className="mt-2 text-muted">{register.subtitle}</p>
      <div className="mt-8">
        <RegisterForm page={register} />
      </div>
      <p className="mt-6 text-sm">
        {register.altText}{" "}
        <SmartLink href={register.altLink.url} className="font-semibold text-brand hover:underline">
          {register.altLink.label}
        </SmartLink>
      </p>
    </section>
  );
}
