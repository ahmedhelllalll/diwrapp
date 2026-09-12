import { headers } from 'next/headers';
import NotFoundView from '@/components/common/NotFoundView';
import { Locale } from '@/i18n-config';

export default async function NotFound() {
  const headerList = await headers();
  const pathname = headerList.get('x-pathname') || '';
  const lang: Locale = pathname.startsWith('/ar') ? 'ar' : 'en';

  return <NotFoundView lang={lang} />;
}
