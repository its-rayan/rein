import CreateGoalDialog from "@/components/goals/create-goal-dialog";
import GoalList from "@/components/goals/goal-list";

export default function GoalsPage() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between">
        <div className="max-w-md">
          <h1 className="text text-lg font-semibold">Goals 🎯</h1>
          <p className="text-muted-foreground">
            You do not rise to the level of your goals, you fall to the level of
            your systems.
          </p>
        </div>
        <CreateGoalDialog />
      </div>

      <GoalList />
    </div>
  );
}
