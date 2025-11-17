/*#########################################################
###### Needed to fetch data with React Query ##############
##########################################################*/

"use server";

import {
  deleteGoalById,
  getGoalById,
  getUserGoals
} from "@/data/goal/goal.dal";
import { GoalType } from "./goal.dto";

export const getGoals = async (): Promise<GoalType[]> => {
  const goals = await getUserGoals();
  return JSON.parse(JSON.stringify(goals)) as GoalType[];
};

export const getGoal = async (goalId: string): Promise<GoalType | null> => {
  const goal = await getGoalById(goalId);
  if (!goal) {
    return null;
  }
  return JSON.parse(JSON.stringify(goal)) as GoalType;
};

export const deleteGoal = async (
  goalId: string
): Promise<{ success: boolean }> => {
  const success = await deleteGoalById(goalId);
  return { success };
};
