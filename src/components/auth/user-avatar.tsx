/* eslint-disable @next/next/no-img-element */

import { Skeleton } from "@/components/ui/skeleton";

export default function UserAvatar({
  url,
  name
}: {
  url: string | undefined | null;
  name: string | undefined | null;
}) {
  // If no URL is provided, render a fallback with the user's initial
  if (!url) {
    return (
      <div className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-yellow-500">
        <span className="font-medium text-white">{name?.charAt(0)}</span>
      </div>
    );
  }

  return (
    <img
      className="rounded-full"
      src={url as string}
      alt="User Avatar"
      width={28}
      height={28}
    />
  );
}

export function UserAvatarSkeleton() {
  return (
    <div className="flex items-center space-x-2">
      <Skeleton className="bg-muted-foreground h-6 w-6 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="bg-muted-foreground h-4 w-[90px]" />
      </div>
    </div>
  );
}
