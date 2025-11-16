import CreateGoalDialog from "@/components/goals/create-goal-dialog";
import GoalList from "@/components/goals/goal-list";
import { getGoals } from "@/data/goal/goal.loader";
import { getQueryClient } from "@/lib/react-query/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function GoalsPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["goals"],
    queryFn: getGoals
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-10">
        <div className="flex justify-between">
          <div className="max-w-md">
            <h1 className="text text-lg font-semibold">Goals 🎯</h1>
            <p className="text-muted-foreground">
              You do not rise to the level of your goals, you fall to the level
              of your systems.
            </p>
          </div>
          <CreateGoalDialog />
        </div>

        <GoalList />
      </div>
    </HydrationBoundary>
  );
}
