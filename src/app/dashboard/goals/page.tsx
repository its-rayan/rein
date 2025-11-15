"use client";

import CreateGoalDialog from "@/components/goals/create-goal-dialog";

export default function GoalsPage() {
  return (
    <div>
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
    </div>
  );
}
