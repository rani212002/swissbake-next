import { HeroSlider } from "@/components/HeroSlider";
import { ProductTabs } from "@/components/ProductTabs";
import { PopularCategories } from "@/components/PopularCategories";
import { RegisterBanner } from "@/components/RegisterBanner";
import { Applications } from "@/components/Applications";
import { BlogSection } from "@/components/BlogSection";
import { getHomePage } from "@/services/content.service";

export default async function HomePage() {
  const home = await getHomePage();
  return (
    <>
      <HeroSlider banners={home.heroBanners} />
      <ProductTabs tabs={home.productTabs} />
      <PopularCategories data={home.popularCategories} />
      <RegisterBanner data={home.registerBanner} />
      <Applications data={home.applications} />
      <BlogSection data={home.blogSection} />
    </>
  );
}
