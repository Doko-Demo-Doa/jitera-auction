import { z } from "zod"

export const email = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim())

export const password = z
  .string()
  .min(6)
  .max(100)
  .transform((str) => str.trim())

export const SignupSchema = z.object({
  email,
  password,
})

export type SignupType = z.infer<typeof SignupSchema>

export const LoginSchema = z.object({
  email,
  password: z.string(),
})

export type LoginType = z.infer<typeof LoginSchema>

export const ForgotPassword = z.object({
  email,
})

export const ResetPassword = z
  .object({
    password: password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // set the path of the error
  })

export const ChangePassword = z.object({
  currentPassword: z.string(),
  newPassword: password,
})
