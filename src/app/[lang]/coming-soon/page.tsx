import type { Metadata } from 'next';
import { getDictionary } from '../../../dictionaries';
import { Locale } from '../../../i18n-config';
import StayTunedView from '@/components/coming-soon/StayTunedView';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const dict = await getDictionary(params.lang as Locale);
  const stayTuned = (dict as any)?.stayTuned;

  return {
    title: `${stayTuned?.screenStayTuned || 'Stay Tuned'} - Di-Wrapp`,
    description: stayTuned?.description || 'Stay tuned for exclusive updates and early access!',
  };
}

export default async function ComingSoonPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const stayTuned = (dict as any)?.stayTuned;

  return <StayTunedView lang={lang} dict={stayTuned} />;
}
