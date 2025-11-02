import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import connectMongoAdaptor from "./database/connect-mongo-adaptor";

const mongoClient = await connectMongoAdaptor();

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(mongoClient),

  // Override default NextAuth pages
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin"
  },

  providers: []
});
