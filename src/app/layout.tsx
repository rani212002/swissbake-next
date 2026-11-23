import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getSite } from "@/services/content.service";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSite();
  return {
    metadataBase: new URL("https://www.swissbake.in"),
    title: seo.title,
    description: seo.description,
    icons: { icon: seo.faviconUrl },
    openGraph: {
      type: "website",
      siteName: seo.siteName,
      title: seo.title,
      description: seo.description,
      images: [seo.ogImageUrl],
    },
    twitter: { card: "summary", description: seo.description },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const site = await getSite();
  return (
    <html lang="en">
      <body>
        <Header site={site} />
        <main>{children}</main>
        <Footer site={site} />
        <WhatsAppButton href={site.contact.floatingWhatsappHref} />
      </body>
    </html>
  );
}
