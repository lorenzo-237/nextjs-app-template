'use client';

import { useSession } from 'next-auth/react';
import { SignInButton } from './SignInButton';
import { UserAvatarButton } from './UserAvatar';

export const AuthButtonClient = () => {
  const session = useSession();

  if (session.data?.user) {
    const user = session.data.user;
    return <UserAvatarButton user={user} />;
  }

  return <SignInButton />;
};
