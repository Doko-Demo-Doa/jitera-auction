import { FORM_ERROR } from "src/core/components/Form"
import signup from "src/auth/mutations/signup"
import { SignupSchema, SignupType } from "src/auth/schemas"
import { useMutation } from "@blitzjs/rpc"
import { TextInput, Title } from "@mantine/core"
import { useForm, zodResolver } from "@mantine/form"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  const form = useForm<SignupType>({
    validate: zodResolver(SignupSchema),
    initialValues: {
      email: "",
      password: "",
    },
  })

  async function handleSubmit(values: SignupType) {
    try {
      await signupMutation(values)
      props.onSuccess?.()
    } catch (error: any) {
      if (error.code === "P2002" && error.meta?.target?.includes("email")) {
        // This error comes from Prisma
        return { email: "This email is already being used" }
      } else {
        return { [FORM_ERROR]: error.toString() }
      }
    }
  }

  return (
    <div>
      <Title>Create an Account</Title>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="Your email address"
          maxLength={200}
          {...form.getInputProps("email")}
        />

        <TextInput
          withAsterisk
          label="Password"
          placeholder="Your password"
          maxLength={200}
          {...form.getInputProps("password")}
        />
      </form>
    </div>
  )
}

export default SignupForm
