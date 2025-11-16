"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { getGoals } from "@/data/goal/goal.loader";
import { useQuery } from "@tanstack/react-query";

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
        <li key={goal.id}> {goal.name}</li>
      ))}
    </div>
  );
}
