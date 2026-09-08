import { redirect } from "next/navigation";
import { Locale } from "../../../../i18n-config";

export default async function VendorDashboard(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  redirect(`/${lang}/coming-soon`);
}
