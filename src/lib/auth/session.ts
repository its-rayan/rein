import { auth } from "@/auth";
import { SessionUser } from "../oauth/types";

export async function getCurrentSessionUser() {
  const session = await auth();
  if (!session) {
    return null;
  }
  return session?.user as SessionUser;
}
