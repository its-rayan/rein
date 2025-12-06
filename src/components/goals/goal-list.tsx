"use client";

import MoreDropdown from "@/components/goals/more-dropdown";
import { Skeleton } from "@/components/ui/skeleton";
import { getGoals } from "@/data/goal/goal.loader";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

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
