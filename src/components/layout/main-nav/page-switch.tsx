"use client";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { ListTodo, Target } from "lucide-react";
import Link from "next/link";

const IconMap = {
  tasks: <ListTodo size="16" />,
  goals: <Target size="16" />
};

function SwitchButton({
  url,
  page,
  currentPage
}: {
  url: string;
  page: "tasks" | "goals";
  currentPage: string;
}) {
  return (
    <Link href={url} className="flex cursor-pointer rounded-full font-medium">
      <span
        className={cn("flex items-center gap-1 rounded-full px-4 py-1", {
          "text-foreground bg-background border": currentPage === page,
          "text-neutral-600": currentPage !== page
        })}
      >
        {IconMap[page]}
        {page === "tasks" ? "Tasks" : "Goals"}
      </span>
    </Link>
  );
}

export default function PageSwitch() {
  // Get the current page from pathname
  // E.g., /dashboard/tasks -> ['', 'dashboard', 'tasks'] => 'tasks'
  const pathname = usePathname();
  const currentPage = pathname?.split("/")[2];
  return (
    <div className="flex w-full flex-1 justify-center">
      <div className="bg-accent flex gap-0.5 rounded-full px-2 py-1.5">
        <SwitchButton
          url="/dashboard/tasks"
          page="tasks"
          currentPage={currentPage}
        />
        <SwitchButton
          url="/dashboard/goals"
          page="goals"
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
