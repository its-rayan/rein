"use client";
import { Button } from "@/components/ui/button";
import { getGoal } from "@/data/goal/goal.loader";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { use } from "react";

export default function GoalPage({
  params
}: {
  params: Promise<{ goalId: string }>;
}) {
  const { goalId } = use(params);
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const description = searchParams.get("description");

  const { data: goal } = useQuery({
    queryKey: ["goals", goalId],
    queryFn: () => getGoal(goalId)
  });

  console.log("Goal data:", goal);

  return (
    <div className="flex justify-between gap-10">
      <div>
        <h1>Goal Details: {goalId}</h1>
        {name && <p>Name: {goal?.name || name}</p>}
        {description && <p>Description: {goal?.description || description}</p>}
      </div>

      <Button>Add Task</Button>
    </div>
  );
}
