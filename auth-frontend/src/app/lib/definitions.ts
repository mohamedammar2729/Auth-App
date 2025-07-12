import * as z from 'zod';

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(4, { message: 'Name must be atleast 4 characters long.' })
    .trim(),
  email: z.email({ message: 'Please enter a valid email!' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Passwords should be minimum 8 characters long' })
    .trim(),
});

export const LoginFormSchema = z.object({
  email: z.email({ message: 'Please enter a valid email!' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Passwords should be minimum 8 characters long' })
    .trim(),
});
