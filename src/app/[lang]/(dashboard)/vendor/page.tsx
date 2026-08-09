import type { Metadata } from "next";
import { getDictionary } from "../../../../dictionaries";
import { Locale } from "../../../../i18n-config";
import VendorDashboardClient from "@/components/dashboard/vendor/VendorDashboardClient";
import { Suspense } from "react";

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const dict = await getDictionary(params.lang as Locale);
  return {
    title: dict.metadata.vendorDashboard.title,
    description: dict.metadata.vendorDashboard.description,
  };
}

export default async function VendorDashboard(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);

  return (
    <Suspense>
      <VendorDashboardClient dict={dict} lang={lang} />
    </Suspense>
  );
}
