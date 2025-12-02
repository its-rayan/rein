"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown, Flag, Plus, Zap } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useCallback, useState } from "react";

const QUERY_TAB_KEY = "tab";

const tabs = [
  {
    id: "goals",
    label: "Goals",
    icon: <Zap fill="#f0b100" className="text-yellow-500" />
  },
  {
    id: "milestones",
    label: "Milestones",
    icon: <Flag className="text-red-500" fill="red" />
  }
];

export default function DashboardPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeTabParam = searchParams.get(QUERY_TAB_KEY);

  const [isActiveTab, setIsActiveTab] = useState<string>(
    activeTabParam ?? tabs[0].id
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="flex max-w-xl flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">Your Dashboard</h1>
        <p className="text-muted-foreground">
          You don&apos;t have to be great to get started, but you have to get
          started to be great.
        </p>
      </div>

      <div className="flex justify-between">
        <div className="flex gap-4">
          {tabs.map((tab) => {
            return (
              <Button
                key={tab.id}
                size="sm"
                variant="ghost"
                className={cn(
                  "cursor-pointer rounded-full transition-all duration-300",
                  isActiveTab === tab.id &&
                    "bg-accent [&>*:last-child]:rotate-180"
                )}
                onClick={() => {
                  setIsActiveTab(tab.id);
                  const queryString = createQueryString(QUERY_TAB_KEY, tab.id);
                  router.push(`${pathname}?${queryString}`);
                }}
              >
                {tab.icon}
                {tab.label}
                <ChevronDown />
              </Button>
            );
          })}
        </div>

        <Button
          size="sm"
          variant="ghost"
          className="cursor-pointer rounded-full"
        >
          <Plus />
          Add New Item
        </Button>
      </div>
    </div>
  );
}
