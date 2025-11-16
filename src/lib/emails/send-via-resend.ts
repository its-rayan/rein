import { Resend } from "resend";

export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

type Options = {
  email: string;
  from: string;
  html?: string;
  subject?: string;
};

export default async function sendViaResend({
  email,
  from,
  html,
  subject
}: Options) {
  if (!resend) {
    throw new Error("RESEND_API_KEY is not defined");
  }

  console.log("✉️ Sending email via Resend to:", email);

  const { data, error } = await resend.emails.send({
    to: email,
    from,
    subject: subject || "Your Login Link",
    html,
    text: "Please use an HTML compatible email viewer to see this message."
  });

  if (error) {
    throw new Error(`Resend email error: ${error}`);
  }

  if (!data?.id) {
    throw new Error("Resend email could not be sent");
  }

  console.log("✅ ✉️ Email successfully sent via Resend:", data.id);
}
