import { auth } from '@/auth';
import { SignInButton } from './SignInButton';
import { UserAvatarButton } from './UserAvatar';

export const AuthButton = async () => {
  const session = await auth();

  if (session) {
    return <UserAvatarButton user={session.user} />;
  }

  return <SignInButton />;
};
