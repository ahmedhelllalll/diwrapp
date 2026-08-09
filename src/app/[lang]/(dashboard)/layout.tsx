import { getDictionary } from "../../../dictionaries";
import { Locale } from "../../../i18n-config";
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";

export default async function DashboardLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
  }
) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);

  return (
    <div className="flex min-h-screen w-full bg-slate-50 dark:bg-black">
      {/* Fixed Sidebar */}
      <div className="sticky top-0 h-screen shrink-0 z-50">
        <Sidebar dict={dict} lang={lang} />
      </div>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <div className="sticky top-0 z-40 bg-slate-50 dark:bg-black">
          <Navbar lang={lang} dict={dict} />
        </div>
        
        {/* Scrollable Main Area */}
        <div className="flex-1">
          {props.children}
        </div>
      </div>
    </div>
  );
}
