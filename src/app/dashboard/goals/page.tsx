import { Button } from "@/components/ui/button";

export default async function GoalsPage() {
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

        <div>
          <Button size="sm">Add a goal</Button>
        </div>
      </div>
    </div>
  );
}
