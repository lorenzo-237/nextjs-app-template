import crypto from 'crypto';
import Credentials from 'next-auth/providers/credentials';
import { env } from '../env';
import { prisma } from '../prisma';
import { signInSchema } from './signInSchema';

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

export const validatePassword = (password: string) => {
  return PASSWORD_REGEX.test(password);
};

export const hashStringWithSalt = (string: string, salt: string) => {
  const hash = crypto.createHash('sha256');

  const saltedString = salt + string;

  hash.update(saltedString);

  const hashedString = hash.digest('hex');

  return hashedString;
};

export const getCredentialsProvider = () => {
  return Credentials({
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    credentials: {
      email: {},
      password: {},
    },
    authorize: async (credentials) => {
      const { email, password } = await signInSchema.parseAsync(credentials);

      let user = null;

      // logic to salt and hash password
      const pwHash = hashStringWithSalt(password, env.AUTH_SECRET);

      return {
        id: 'abcd',
        email: 'lorenzo.softdev@gmail.com',
        name: 'lorenzo',
        image: null,
      };

      // logic to verify if user exists
      user = await prisma.user.findFirst({
        where: {
          email: email,
          passwords: {
            some: {
              passwordHash: pwHash,
            },
          },
        },
      });

      if (!user) {
        // No user found, so this is their first attempt to login
        // meaning this is also the place you could do registration
        throw new Error('User not found.');
      }

      // return user object with the their profile data
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
      };
    },
  });
};
