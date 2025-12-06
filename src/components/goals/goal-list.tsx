"use client";

import MoreDropdown from "@/components/goals/more-dropdown";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { GoalType } from "@/data/goal/goal.dto";
import { getGoals } from "@/data/goal/goal.loader";
import { useQuery } from "@tanstack/react-query";
import { Zap } from "lucide-react";
import Link from "next/link";

function GoalListSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from(Array(8).keys()).map((key) => (
        <Skeleton key={key} className="h-52 w-full rounded-xl" />
      ))}
    </div>
  );
}

function EmptyGoalList() {
  return (
    <Empty className="border-2 border-solid">
      <EmptyHeader>
        <EmptyMedia variant="icon" className="rounded-full">
          <Zap fill="#f0b100" className="text-yellow-500" />
        </EmptyMedia>
        <EmptyTitle>No Goals Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any goals yet. Get started by creating your
          first goal.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button className="rounded-xl">Create Goal</Button>
      </EmptyContent>
    </Empty>
  );
}

function GoalCard({ goal }: { goal: GoalType }) {
  return (
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
        <GoalCard key={goal.id} goal={goal} />
      ))}
    </div>
  );
}
