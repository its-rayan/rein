import { auth } from "@/auth";
import connectToDbClient from "@/database/connect-db-client";
import User from "@/database/models/user";
import { SessionUser } from "@/lib/oauth/types";
import { cache } from "react";
import "server-only"; // This file can only be imported by server components.

type ImprovedSessionUser = { id: string } & SessionUser;

export const verifySession = cache(async () => {
  // check if user is logged in
  const session = await auth();
  if (!session || !session.user) {
    Response.redirect("/auth/signin");
  }

  await connectToDbClient();

  const dbUser = await User.findOne({ email: session?.user?.email });
  const user = { ...session?.user, id: dbUser._id } as ImprovedSessionUser;

  return { isAuth: true, user };
});
