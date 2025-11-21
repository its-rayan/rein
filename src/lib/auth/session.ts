import { auth } from "@/auth";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  image: string;
};

export async function getCurrentSessionUser() {
  const session = await auth();
  if (!session) {
    return null;
  }
  return session?.user as SessionUser;
}
