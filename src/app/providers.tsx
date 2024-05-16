'use client';

import { ThemeProvider } from '@/components/theme/theme-provider';
import type { PropsWithChildren } from 'react';

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider attribute='class' defaultTheme='light' enableSystem>
      {children}
    </ThemeProvider>
  );
};
