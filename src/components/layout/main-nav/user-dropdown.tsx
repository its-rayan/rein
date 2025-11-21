"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import UserAvatar from "@/components/auth/user-avatar";
import { Button } from "@/components/ui/button";
import { SessionUser } from "@/lib/auth/session";
import { LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";

export default function UserDropdown({ user }: { user: SessionUser }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="cursor-pointer">
          <UserAvatar url={user?.image} name={user?.name} />
          {user?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="flex flex-col">
          <span className="font-medium">{user?.name}</span>
          <span className="text-muted-foreground">{user?.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: "/auth/signin" })}
        >
          <LogOut />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
