'use server';

import { hashStringWithSalt, validatePassword } from '@/lib/authentication/credentials-provider';
import { env } from '@/lib/env';
import { prisma } from '@/lib/prisma';
import { ActionError, action } from '@/lib/server-actions/safe-actions';
import { SignupFormSchema } from './signup.schema';

export const signUpAction = action(SignupFormSchema, async ({ email, password, name }) => {
  if (!validatePassword(password)) {
    throw new ActionError(
      'Invalid new password. Must be at least 8 characters, and contain at least one letter and one number'
    );
  }

  const passwordHash = hashStringWithSalt(password, env.AUTH_SECRET);

  try {
    const userData = {
      email,
      name,
    };

    const user = await prisma.user.create({
      data: {
        ...userData,
        passwords: {
          create: {
            passwordHash,
          },
        },
      },
    });

    return user;
  } catch {
    throw new ActionError('Email already exists');
  }
});
