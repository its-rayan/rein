import authEdgeConfig from "@/auth-edge.config";
import connectMongoAdaptor from "@/database/connect-mongo-adaptor";
import sendEmail from "@/lib/emails";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
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

  session: { strategy: "jwt" },

  ...authEdgeConfig,
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
    }),

    // Google OAuth provider to enable sign in with Google accounts
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ]
});
