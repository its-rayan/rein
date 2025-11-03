/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";

import PageSwitch from "@/components/layout/main-nav/page-switch";
import UserDropdown from "@/components/layout/main-nav/user-dropdown";

export default async function MainNav() {
  const session = await auth();
  return (
    <div className="bg-transparent py-4">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-row items-center">
          {/* logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              className="dark:invert"
              src="/logo.svg"
              alt="Rein logomark"
              width={48}
              height={48}
            />
            <span className="text-xl font-semibold">Rein</span>
          </Link>

          <PageSwitch />

          <div>
            <UserDropdown user={session?.user as any} />
          </div>
        </div>
      </div>
    </div>
  );
}
