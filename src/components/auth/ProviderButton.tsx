import React from 'react';
import { Button } from '../ui/button';
import { signIn } from 'next-auth/react';

export function ProviderButton() {
  return <Button onClick={() => signIn('github')}>Github</Button>;
}
