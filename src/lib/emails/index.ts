import sendViaNodeMailer from "@/lib/emails/send-via-nodemailer";
import sendViaResend from "@/lib/emails/send-via-resend";
import { type EmailConfig } from "next-auth/providers/email";
import { type NodemailerConfig } from "next-auth/providers/nodemailer";

type Params = {
  provider: NodemailerConfig | EmailConfig;
  identifier: string;
  url: string;
};

export default async function sendEmail(params: Params) {
  const { identifier: email, url, provider } = params;
  const html = `<p>Sign in to ${url} by clicking <a href="${url}">here</a>.</p>`;
  const subject = `Your ${process.env.NEXT_PUBLIC_APP_NAME} Login Link`;
  const from = provider.from as string;

  const options = { email, from, subject, html };

  if (process.env.VERCEL_ENV === "production") {
    return await sendViaResend(options);
  }

  return await sendViaNodeMailer(options);
}
