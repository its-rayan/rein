"use client";
import { useSearchParams } from "next/navigation";
import { use } from "react";

export default function GoalPage({
  params
}: {
  params: Promise<{ goalId: string }>;
}) {
  const { goalId } = use(params);
  const searchParams = useSearchParams();
  console.log("Search Params:", Array.from(searchParams.entries()));
  const name = searchParams.get("name");
  const description = searchParams.get("description");

  return (
    <div className="flex flex-col gap-10">
      <h1>Goal Details: {goalId}</h1>
      {name && <p>Name: {name}</p>}
      {description && <p>Description: {description}</p>}
    </div>
  );
}
