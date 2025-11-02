import connectMongoAdaptor from "@/database/connect-mongo-adaptor";
import sendEmail from "@/lib/emails";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import Nodemailer from "next-auth/providers/nodemailer";
import Resend from "next-auth/providers/resend";

const mongoClient = await connectMongoAdaptor();

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(mongoClient),

  // Override default NextAuth pages
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin"
  },

  providers: [
    // Nodemailer provider to send sign in emails via SMTP for development
    Nodemailer({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD
        }
      },
      from: "Rein <noreply@account.mailhog>",
      sendVerificationRequest: sendEmail
    }),

    // Resend provider to send sign in emails via Resend for production
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: "Rein <noreply@account.userein.co>",
      sendVerificationRequest: sendEmail
    })
  ]
});
