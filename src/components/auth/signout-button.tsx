"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import router from "next/router";

export default function SignOutButton() {
  return (
    <Button
      variant="ghost"
      className="p-0"
      onClick={() => {
        signOut();
        router.push("/auth/signin");
      }}
    >
      Sign out
    </Button>
  );
}
