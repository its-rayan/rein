/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { deleteGoal, getGoals } from "@/data/goal/goal.loader";
import { getQueryClient } from "@/lib/react-query/get-query-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ArrowUpRight,
  Link as LinkIcon,
  MoreHorizontal,
  Trash2
} from "lucide-react";
import Link from "next/link";

function MoreDropdown({ goalId }: { goalId?: string }) {
  const queryClient = getQueryClient();
  const mutation = useMutation({
    mutationFn: (goalId: string) => {
      return deleteGoal(goalId);
    },
    onMutate: async (goalId: string) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["goals"] });

      // Snapshot the previous value
      const previousGoals = queryClient.getQueryData(["goals"]);

      // Optimistically update to the new value after deletion
      queryClient.setQueryData(["goals"], (oldGoals: any) => {
        if (!oldGoals) return oldGoals;
        return oldGoals.filter((goal: any) => goal.id !== goalId);
      });

      // Return a context object with the snapshotted value
      return { previousGoals };
    },
    onError: (err, goalId, context: any) => {
      queryClient.setQueryData(["goals"], context.previousGoals);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    }
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="size-6 self-end rounded-full bg-white/20 p-0 hover:bg-white/50 hover:text-white"
        >
          <MoreHorizontal />
          <span className="sr-only">More</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 rounded-lg"
        side="right"
        align="start"
      >
        <DropdownMenuItem>
          <LinkIcon className="text-muted-foreground" />
          <span>Copy Link</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ArrowUpRight className="text-muted-foreground" />
          <span>Open in New Tab</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            mutation.mutate(goalId as string);
          }}
        >
          <Trash2 className="text-muted-foreground" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function GoalListSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from(Array(5).keys()).map((key) => (
        <Skeleton key={key} className="h-[125px] w-full rounded-xl" />
      ))}
    </div>
  );
}

function EmptyGoalList() {
  return (
    <div>
      <h1 className="text-4xl">No goals yet!</h1>
    </div>
  );
}

export default function GoalList() {
  const { data: goals, isLoading } = useQuery({
    queryKey: ["goals"],
    queryFn: getGoals
  });

  if (isLoading) {
    return <GoalListSkeleton />;
  }

  if (!goals?.length) {
    return <EmptyGoalList />;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {goals?.map((goal) => (
        <div
          key={goal.id}
          className="relative flex h-52 flex-col rounded-lg bg-amber-500 p-4 text-white"
        >
          <MoreDropdown goalId={goal.id} />
          <Link
            href={`/dashboard/goals/${goal.id}?name=${goal.name}&description=${goal.description}`}
            className="flex h-full w-full flex-col"
          >
            <div className="grow wrap-break-word">
              <h2 className="line-clamp-5 font-medium">{goal.name}</h2>
            </div>

            <p className="text-sm font-medium">0% Progress</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
