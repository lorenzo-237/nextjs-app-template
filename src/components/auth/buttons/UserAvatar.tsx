'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserDropdown } from './UserDropdown';

export const UserAvatarButton = ({
  user,
}: {
  user: {
    name?: string | null;
    email: string;
    image?: string | null;
  };
}) => {
  return (
    <UserDropdown>
      <button className='group size-9 rounded-full'>
        <Avatar className='mr-2 size-full group-active:scale-95'>
          <AvatarFallback className='bg-card'>{user.email.slice(0, 1).toUpperCase()}</AvatarFallback>
          {user.image && <AvatarImage src={user.image} />}
        </Avatar>
      </button>
    </UserDropdown>
  );
};
