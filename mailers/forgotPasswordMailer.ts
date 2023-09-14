/* TODO - You need to add a mailer integration in `integrations/` and import here.
 *
 * The integration file can be very simple. Instantiate the email client
 * and then export it. That way you can import here and anywhere else
 * and use it straight away.
 */

import mailer from "integrations/mailer"

type ResetPasswordMailer = {
  to: string
  token: string
}

export function forgotPasswordMailer({ to, token }: ResetPasswordMailer) {
  // In production, set APP_ORIGIN to your production server origin
  const origin = process.env.APP_ORIGIN || process.env.BLITZ_DEV_SERVER_ORIGIN
  const resetUrl = `${origin}/auth/reset-password?token=${token}`

  const msg = {
    from: "onboarding@resend.dev",
    to,
    subject: "Your Password Reset Instructions",
    html: `
      <h1>Reset Your Password</h1>

      <a href="${resetUrl}">
        Click here to set a new password
      </a>
    `,
  }

  return {
    async send() {
      mailer.sendEmail(to, msg.subject, msg.html)
      // if (process.env.NODE_ENV === "production") {
      //   // TODO - send the production email, like this:
      //   // await postmark.sendEmail(msg)
      //   mailer.sendEmail(to, msg.subject, msg.html)
      //   throw new Error("No production email implementation in mailers/forgotPasswordMailer")
      // } else {
      //   // Preview email in the browser
      //   const previewEmail = (await import("preview-email")).default
      //   await previewEmail(msg)
      // }
    },
  }
}
