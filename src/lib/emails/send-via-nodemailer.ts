import nodemailer from "nodemailer";

type Options = {
  email: string;
  from?: string;
  html?: string;
  subject?: string;
};

export default async function sendViaNodeMailer({
  email,
  from,
  html,
  subject
}: Options) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  });

  console.log("✉️ Sending email via Nodemailer to:", email);

  const result = await transporter.sendMail({
    from,
    to: email,
    subject,
    html
  });

  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
  }

  console.log(
    "✅ ✉️ Email successfully sent via Nodemailer:",
    result.messageId
  );
}
