import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin"
  },
  providers: []
});
