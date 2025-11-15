"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import SignOutButton from "@/components/auth/signout-button";
import UserAvatar from "@/components/auth/user-avatar";
import { Button } from "@/components/ui/button";
import { SessionUser } from "@/lib/oauth/types";
import { LogOut, User } from "lucide-react";

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
        <DropdownMenuItem>
          <LogOut />
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
