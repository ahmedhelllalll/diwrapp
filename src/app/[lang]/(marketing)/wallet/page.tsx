import type { Metadata } from 'next';
import { getDictionary } from '@/dictionaries';
import { Locale } from '@/i18n-config';
import { constructMetadata } from '@/lib/seo/metadata';
import WalletHero from '@/components/marketing/wallet/WalletHero';
import WalletStatement from '@/components/marketing/wallet/WalletStatement';
import WalletFeatures from '@/components/marketing/wallet/WalletFeatures';
import '../../../wallet.css';

type WalletDictData = {
  heroBadge?: string;
  heroTitleLine1?: string;
  heroTitleLine2?: string;
  heroSubtitlePart1?: string;
  heroSubtitleLine1?: string;
  heroSubtitleLine2?: string;
  heroSubtitleLine3?: string;
  heroSubtitleHighlight?: string;
  ctaButton?: string;
  heroImageAlt?: string;
  statementLight?: string;
  statementMedium?: string;
  featuresBadge?: string;
  featuresDesc?: string;
  cards?: {
    card1?: { title?: string; description?: string };
    card2?: { title?: string; description?: string };
    card3?: { title?: string; description?: string };
  };
};

interface WalletMetadataDict {
  metadata?: {
    wallet?: {
      title?: string;
      description?: string;
    };
  };
  wallet?: WalletDictData;
}

export async function generateMetadata(props: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = (await getDictionary(lang)) as unknown as WalletMetadataDict;
  const meta = dict.metadata?.wallet;
  const wallet = dict.wallet;
  const isAr = lang === 'ar';
  const title = meta?.title || (isAr ? 'المحفظة الذكية | مدفوعات فورية وضمان مالي موثوق' : 'Digital Wallet | Instant Payouts & Escrow Billing');
  const description = (
    meta?.description ||
    `${wallet?.heroTitleLine1 || (isAr ? 'معاملات فورية وآمنة' : 'Secure, Flexible &')} ${wallet?.heroTitleLine2 || (isAr ? 'وبمنتهى المرونة' : 'Instant Transactions')}`
  ).trim();

  return constructMetadata({
    title,
    description,
    path: '/wallet',
    lang,
    ogImageAlt: isAr ? 'محفظة Di-Wrapp الرقمية' : 'Di-Wrapp Digital Wallet',
  });
}

export default async function WalletPage(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const wallet = (dict as unknown as WalletMetadataDict).wallet || {};

  return (
    <main className="wallet-scope flex-grow flex flex-col bg-white dark:bg-surface-1 transition-colors duration-300">
      <WalletHero lang={lang} dict={wallet} />
      <WalletStatement dict={wallet} />
      <WalletFeatures dict={wallet} />
    </main>
  );
}
