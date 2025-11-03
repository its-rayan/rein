"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <Button
      variant="ghost"
      className="p-0"
      onClick={() => signOut({ callbackUrl: "/auth/signin" })}
    >
      Sign out
    </Button>
  );
}
