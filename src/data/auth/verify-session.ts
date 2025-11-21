import { auth } from "@/auth";
import { SessionUser } from "@/lib/auth/session";
import { cache } from "react";
import "server-only"; // This file can only be imported by server components.

export const verifySession = cache(async () => {
  // check if user is logged in
  const session = await auth();
  if (!session || !session.user) {
    Response.redirect("/auth/signin");
  }

  return { isAuth: true, user: session?.user as SessionUser };
});
