"use client";

import { getGoals } from "@/data/goal/goal.loader";
import { useQuery } from "@tanstack/react-query";

export default function GoalList() {
  const { data: goals } = useQuery({
    queryKey: ["goals"],
    queryFn: getGoals
  });

  if (!goals) {
    return <p>No loagaes</p>;
  }

  console.log("getGoals: ", goals);
  return (
    <div>
      {goals.map((goal) => (
        <li key={goal.id}> {goal.name}</li>
      ))}
    </div>
  );
}
