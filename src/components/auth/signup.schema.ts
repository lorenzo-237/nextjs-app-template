import { z } from 'zod';

export const SignupFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  verifyPassword: z.string().min(8),
});

export type SignupFormType = z.infer<typeof SignupFormSchema>;
