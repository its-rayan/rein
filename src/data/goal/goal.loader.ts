/*#########################################################
###### Needed to fetch data with React Query ##############
##########################################################*/

"use server";

import { getUserGoals } from "@/data/goal/goal.dal";
import { GoalType } from "./goal.dto";

export const getGoals = async (): Promise<GoalType[]> => {
  const goals = await getUserGoals();
  return JSON.parse(JSON.stringify(goals)) as GoalType[];
};
