"use client";

import { ChevronDown, LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { SessionUser } from "@/lib/auth/session";
import { signOut } from "next-auth/react";
import Image from "next/image";

export function TeamSwitcher({ user }: { user: SessionUser }) {
  const avatar = user?.image;
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="w-fit px-1.5">
              {!avatar ? (
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-5 items-center justify-center rounded-full">
                  <span className="flex items-center justify-center font-medium text-white uppercase">
                    {user?.name?.charAt(0)}
                  </span>
                </div>
              ) : (
                <Image
                  className="flex aspect-square size-5 rounded-full"
                  src={avatar as string}
                  alt="User Avatar"
                  width={20}
                  height={20}
                  unoptimized
                  referrerPolicy="no-referrer"
                />
              )}

              <span className="truncate font-medium">{user?.name}</span>
              <ChevronDown className="opacity-50" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-64 rounded-lg"
            align="start"
            side="bottom"
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground">
              {user?.email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2 p-2"
              onClick={() => signOut({ callbackUrl: "/auth/signin" })}
            >
              <LogOut />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
