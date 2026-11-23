import type { Metadata } from "next";
import { LegalView } from "@/components/LegalView";
import { getLegalPage } from "@/services/content.service";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getLegalPage("privacy-policy")).seoTitle };
}

export default async function Page() {
  return <LegalView page={await getLegalPage("privacy-policy")} />;
}
