import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './lib/prisma';
import { nextAuthProviders } from './lib/authentication/nextauth-providers';

export const { handlers, auth } = NextAuth({
  pages: {
    signIn: '/auth/login',
  },
  adapter: PrismaAdapter(prisma),
  providers: nextAuthProviders(),
  session: {
    strategy: 'database',
  },
});
