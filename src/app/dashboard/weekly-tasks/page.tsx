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

      <div className="border-b-secondary flex justify-between border-b-2 pb-8">
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

        {/* Progress bar */}
        <div className="w-xl text-sm font-medium">
          {/* keys */}
          <div className="mb-10 flex items-center justify-end gap-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-600"></div>
              <span className="text-muted-foreground">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-amber-600"></div>
              <span className="text-muted-foreground">Pending</span>
            </div>
          </div>

          {/* progress bar */}
          <div className="flex gap-1">
            <div className="relative h-3 w-[60%] rounded-full rounded-r-none bg-green-600">
              <span className="text-muted-foreground absolute right-0 bottom-4">
                60%
              </span>
            </div>

            <div className="relative h-3 w-[40%] rounded-full rounded-l-none bg-amber-600">
              <span className="text-muted-foreground absolute right-0 bottom-4">
                40%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
