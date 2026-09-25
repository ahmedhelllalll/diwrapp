'use client';

import React from 'react';
import Header, { HeaderProps } from './Header';

/**
 * @deprecated Use `Header` from `@/components/layout/Header` instead.
 */
export default function LandingHeader(props: HeaderProps) {
  return <Header {...props} />;
}

export { Header };

