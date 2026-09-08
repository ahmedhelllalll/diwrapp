import React from 'react';
import DesignSystem from '@/components/DesignSystem';

export default async function DesignSystemPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  
  return (
    <main>
      <DesignSystem />
    </main>
  );
}
