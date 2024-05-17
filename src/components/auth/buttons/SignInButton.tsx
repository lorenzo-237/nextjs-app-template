'use client';

import { buttonVariants } from '@/components/ui/button';
import { useIsClient } from '@/hooks/useIsClient';
import type { VariantProps } from 'class-variance-authority';
import Link from 'next/link';

const useHref = () => {
  const isClient = useIsClient();

  if (!isClient) {
    return '';
  }

  const href = window.location.href;

  return `${href}`;
};

export const SignInButton = (props: VariantProps<typeof buttonVariants>) => {
  const href = useHref();

  return (
    <Link className={buttonVariants({ size: 'sm', variant: 'outline', ...props })} href={`/login?callbackUrl=${href}`}>
      Sign in
    </Link>
  );
};
