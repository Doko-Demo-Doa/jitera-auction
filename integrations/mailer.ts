import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const mailer = {
  sendEmail: (to: string, subject: string, content: string) => {
    resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject,
      html: content,
    })
  },
}

export default mailer
