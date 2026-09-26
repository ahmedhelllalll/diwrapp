import React from 'react';
import DesignSystem from '@/components/internal/DesignSystem';

export default async function DesignSystemPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  
  return (
    <main>
      {/* Font Awesome is only loaded on this internal developer sandbox page */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <DesignSystem />
    </main>
  );
}
