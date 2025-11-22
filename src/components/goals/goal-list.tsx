"use client";

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
    <div>
      {goals?.map((goal) => (
        <Link
          key={goal.id}
          href={`/dashboard/goals/${goal.id}?name=${goal.name}&description=${goal.description}`}
          className="mb-4 block rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
        >
          <h2 className="text-xl font-semibold">{goal.name}</h2>
          <p className="text-gray-600">{goal.description}</p>
          {goal.deadline && (
            <p className="text-gray-500">
              Deadline: {new Date(goal.deadline).toLocaleDateString()}
            </p>
          )}
        </Link>
      ))}
    </div>
  );
}
