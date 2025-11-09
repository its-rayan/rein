"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const pages = [
  { id: "dashboard", name: "Dashboard", url: "/dashboard" },
  { id: "goals", name: "Goals", url: "/dashboard/goals" },
  { id: "weekly-tasks", name: "Weekly Tasks", url: "/dashboard/weekly-tasks" }
];

export default function Navbar() {
  // Get the current page from pathname
  // E.g., /dashboard/goals -> ['', 'dashboard', 'goals'] => 'goals'
  const pathname = usePathname();
  const currentPage = pathname?.split("/")[2];

  return (
    <div className="flex gap-2">
      {pages.map((page) => (
        <Link key={`${page.id}-navbar-button`} href={page.url}>
          <Button
            variant={
              (!currentPage && page.id === "dashboard") ||
              currentPage === page.id
                ? "secondary"
                : "ghost"
            }
            size="sm"
            className="cursor-pointer"
          >
            {page.name}
          </Button>
        </Link>
      ))}
    </div>
  );
}
