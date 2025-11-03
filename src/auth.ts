import authEdgeConfig from "@/auth-edge.config";
import connectToDbClient from "@/database/connect-db-client";
import connectMongoAdaptor from "@/database/connect-mongo-adaptor";
import User from "@/database/models/user";
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
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // Custom sign in logic to add additional user details to magic link users
      console.log("SignIn callback:", {
        user,
        account,
        profile,
        email,
        credentials
      });

      // check if the user is signing in with email provider
      if (account?.type === "email") {
        // Add additional user details to the user object
        const username = user?.email?.split("@")[0];
        const updatedUserObj = {
          ...user,
          name: username,
          image: `https://api.dicebear.com/6.x/initials/svg?seed=${username}`
        };

        console.log("Updated user object:", updatedUserObj);

        await connectToDbClient();

        const userExists = await User.findOne({ email: user?.email });
        if (!userExists) {
          await User.create(updatedUserObj);
        } else {
          await User.updateOne({ email: user?.email }, updatedUserObj);
        }
      }

      return true;
    },

    async session({ token, session }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.picture as string;
      }

      return session;
    },

    async jwt({ token, user }) {
      await connectToDbClient();
      const dbUser = await User.findOne({ email: token.email });

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image
      };
    }
  }
});
