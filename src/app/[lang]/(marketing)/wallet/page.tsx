import type { Metadata } from 'next';
import { getDictionary } from '@/dictionaries';
import { Locale } from '@/i18n-config';
import WalletHero from '@/components/marketing/wallet/WalletHero';
import WalletStatement from '@/components/marketing/wallet/WalletStatement';
import WalletFeatures from '@/components/marketing/wallet/WalletFeatures';
import '../../../wallet.css';

export async function generateMetadata(props: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const meta = (dict as any).metadata?.wallet;
  const wallet = (dict as any).wallet;
  const isAr = lang === 'ar';
  const title = meta?.title || (isAr ? 'المحفظة' : 'Wallet');
  const description = (
    meta?.description ||
    `${wallet?.heroTitleLine1 || (isAr ? 'معاملات فورية وآمنة' : 'Secure, Flexible &')} ${wallet?.heroTitleLine2 || (isAr ? 'وبمنتهى المرونة' : 'Instant Transactions')}`
  ).trim();

  return {
    metadataBase: new URL('https://diwrapp.com'),
    title,
    description,
    alternates: {
      canonical: `/${lang}/wallet`,
      languages: {
        en: 'https://diwrapp.com/en/wallet',
        ar: 'https://diwrapp.com/ar/wallet',
        'x-default': 'https://diwrapp.com/en/wallet',
      },
    },
    openGraph: {
      title,
      description,
      url: `https://diwrapp.com/${lang}/wallet`,
      siteName: 'DiWrapp',
      locale: isAr ? 'ar_AR' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/images/og-banner.png',
          width: 1920,
          height: 620,
          alt: isAr ? 'دي-راب - المحفظة الرقمية' : 'DiWrapp Wallet',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/og-banner.png'],
    },
  };
}

export default async function WalletPage(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const wallet = (dict as any).wallet;

  return (
    <main className="wallet-scope flex-grow flex flex-col bg-white dark:bg-surface-1 transition-colors duration-300">
      <WalletHero lang={lang} dict={wallet} />
      <WalletStatement dict={wallet} />
      <WalletFeatures dict={wallet} />
    </main>
  );
}
