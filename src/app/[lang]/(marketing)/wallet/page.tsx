import type { Metadata } from 'next';
import { getDictionary } from '@/dictionaries';
import { Locale } from '@/i18n-config';
import WalletHero from '@/components/marketing/wallet/WalletHero';
import WalletStatement from '@/components/marketing/wallet/WalletStatement';
import WalletFeatures from '@/components/marketing/wallet/WalletFeatures';

export async function generateMetadata(props: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const meta = (dict as any).metadata?.wallet;
  const wallet = (dict as any).wallet;

  return {
    title: `${meta?.title || 'Wallet'} - Di-Wrapp`,
    description:
      meta?.description ||
      `${wallet?.heroTitleLine1 || 'Secure, Flexible &'} ${wallet?.heroTitleLine2 || 'Instant Transactions'}`,
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
    <main className="flex-grow flex flex-col bg-white dark:bg-[#080808] transition-colors duration-300">
      <WalletHero lang={lang} dict={wallet} />
      <WalletStatement dict={wallet} />
      <WalletFeatures dict={wallet} />
    </main>
  );
}
