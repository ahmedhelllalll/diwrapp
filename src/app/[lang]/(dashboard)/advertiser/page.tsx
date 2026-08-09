import type { Metadata } from "next";
import { getDictionary } from "../../../../dictionaries";
import { Locale } from "../../../../i18n-config";
import AdvertiserDashboardClient from "@/components/dashboard/advertiser/AdvertiserDashboardClient";

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const dict = await getDictionary(params.lang as Locale);
  return {
    title: dict.metadata.advertiserDashboard.title,
    description: dict.metadata.advertiserDashboard.description,
  };
}

export default async function AdvertiserDashboard(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);

  return <AdvertiserDashboardClient dict={dict} lang={lang} />;
}
