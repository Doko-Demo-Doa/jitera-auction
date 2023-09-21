import { AuthenticationError, PromiseReturnType } from "blitz"
import Link from "next/link"

import { useMutation } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import { useForm, zodResolver } from "@mantine/form"
import { Title, TextInput, Button, Container, Anchor, Space, Stack } from "@mantine/core"

import { LabeledTextField } from "src/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/core/components/Form"
import login from "src/auth/mutations/login"
import { LoginSchema, LoginType } from "src/auth/schemas"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation, { isLoading }] = useMutation(login)
  const form = useForm<LoginType>({
    validate: zodResolver(LoginSchema),
    initialValues: {
      email: "",
      password: "",
    },
  })

  async function handleSubmit(values: LoginType) {
    try {
      const user = await loginMutation(values)
      props.onSuccess?.(user)
    } catch (error: any) {
      if (error instanceof AuthenticationError) {
        return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
      } else {
        return {
          [FORM_ERROR]:
            "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
        }
      }
    }
  }

  return (
    <>
      <Container size="sm">
        <Title>Login</Title>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            withAsterisk
            label="Email"
            placeholder="Your email address"
            maxLength={200}
            mb="md"
            disabled={isLoading}
            {...form.getInputProps("email")}
          />

          <TextInput
            withAsterisk
            label="Password"
            placeholder="Your password"
            maxLength={200}
            type="password"
            disabled={isLoading}
            {...form.getInputProps("password")}
          />

          <Button type="submit" fullWidth mt="md" disabled={isLoading}>
            Sign in
          </Button>
        </form>

        <Stack mt="xl">
          <Anchor component={Link} href={Routes.ForgotPasswordPage()}>
            Forgot your password?
          </Anchor>
          <Space />
          <Anchor component={Link} href={Routes.SignupPage()}>
            Sign Up
          </Anchor>
        </Stack>
      </Container>
    </>
  )
}

export default LoginForm
