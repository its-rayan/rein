/*#########################################
###### Data Access File For Goals #########
##########################################*/

import { verifySession } from "@/data/auth/verify-session";
import { CreateGoalType, GoalType } from "@/data/goal/goal.dto";
import { getUserById, populatedUserGoalsById } from "@/data/user/user.dal";
import Goal, { IGoal } from "@/database/models/goal";
import "server-only"; // This file can only be imported by server components.

export const createGoal = async (goal: CreateGoalType): Promise<GoalType> => {
  const { user } = await verifySession();

  // create goal
  const dbGoal: IGoal = await Goal.create({ ...goal, userId: user.id });

  // Add goal to user
  const dbUser = await getUserById(user.id);
  dbUser.goals.push(dbGoal._id);
  await dbUser.save();

  return {
    id: dbGoal._id.toString(),
    name: dbGoal.name,
    description: dbGoal.description,
    deadline: dbGoal.deadline
  };
};

export const getUserGoals = async (): Promise<GoalType[]> => {
  const { user } = await verifySession();

  const dbUserWithGoals = await populatedUserGoalsById(user.id);
  const goals = dbUserWithGoals.goals
    .map((goal) => ({
      id: goal._id.toString(),
      name: goal.name,
      description: goal.description,
      deadline: goal.deadline
    }))
    .reverse(); // Reverse to show the newest goals first

  return goals;
};
