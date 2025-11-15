"use client";
import Image from "next/image";
import Link from "next/link";

import { UserAvatarSkeleton } from "@/components/auth/user-avatar";
import Navbar from "@/components/layout/main-nav/navbar";
import UserDropdown from "@/components/layout/main-nav/user-dropdown";
import type { SessionUser } from "@/lib/oauth/types";
import { useSession } from "next-auth/react";

export default function MainNav() {
  const { data: session, status } = useSession();
  return (
    <div className="bg-transparent py-4">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                className="dark:invert"
                src="/logo.svg"
                alt="Rein logomark"
                width={40}
                height={40}
              />
              <span className="text-lg font-semibold">Rein</span>
            </Link>

            <Navbar />
          </div>

          {status === "loading" ? (
            <UserAvatarSkeleton />
          ) : (
            <UserDropdown user={session?.user as SessionUser} />
          )}
        </div>
      </div>
    </div>
  );
}
