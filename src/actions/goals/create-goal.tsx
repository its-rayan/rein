"use server";

import { createGoal } from "@/data/goal/goal.dal";
import { createGoalSchema } from "@/data/goal/goal.dto";
import { actionClient } from "../safe-action";

export const createGoalAction = actionClient
  .inputSchema(createGoalSchema)
  .action(async ({ parsedInput }) => {
    const goal = await createGoal(parsedInput);
    return { goal: JSON.parse(JSON.stringify(goal)) };
  });
