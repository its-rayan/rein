import { Button } from "@/components/ui/button";
import { Calendar, ChevronDown } from "lucide-react";

export default async function WeeklyTasksPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text text-lg font-semibold">Weekly Tasks</h1>
          <Button variant="outline" size="sm">
            <Calendar />
            Current Week
            <ChevronDown />
          </Button>
        </div>

        <Button size="sm">Add a task</Button>
      </div>

      <div>
        <div className="max-w-2xs">
          <h2 className="text-muted-foreground mb-4 font-semibold">
            Weekly Summary
          </h2>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-2">
              <p className="text-muted-foreground whitespace-nowrap">Pending</p>
              <div className="text-muted-foreground overflow-hidden">
                ..................................................................................
              </div>
              <p className="text-amber-600">4</p>
            </div>
            <div className="flex justify-between gap-2">
              <p className="text-muted-foreground whitespace-nowrap">
                Completed
              </p>
              <div className="text-muted-foreground overflow-hidden">
                ..................................................................................
              </div>
              <p className="text-green-600">6</p>
            </div>
            <div className="flex justify-between gap-2">
              <p className="text-muted-foreground whitespace-nowrap">Total</p>
              <div className="text-muted-foreground overflow-hidden">
                ..................................................................................
              </div>
              <p>10</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
