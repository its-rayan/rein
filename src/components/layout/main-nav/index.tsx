/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/layout/main-nav/navbar";
import UserDropdown from "@/components/layout/main-nav/user-dropdown";

export default async function MainNav() {
  const session = await auth();
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

          <UserDropdown user={session?.user as any} />
        </div>
      </div>
    </div>
  );
}
