import type { Metadata } from 'next';
import { getDictionary } from '@/dictionaries';
import { Locale } from '@/i18n-config';
import ComingSoonView from '@/components/coming-soon/ComingSoonView';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const dict = await getDictionary(params.lang as Locale);
  const stayTuned = (dict as any)?.stayTuned;
  const blogMeta = (dict as any)?.metadata?.blog;
  const navBlog = dict.landing?.nav?.blog || 'Blog';

  return {
    title: `${blogMeta?.title || `${navBlog} - Stay Tuned`} - Di-Wrapp`,
    description: blogMeta?.description || stayTuned?.description || 'Stay tuned for exclusive updates and early access!',
  };
}

export default async function BlogPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const stayTuned = (dict as any)?.stayTuned;
  const l = dict.landing;

  return (
    <ComingSoonView
      lang={lang}
      dict={stayTuned}
      dictNav={l.nav}
      showNavLinks={true}
    />
  );
}
