/*#########################################
###### Data Access File For Goals #########
##########################################*/

import { verifySession } from "@/data/auth/verify-session";
import { CreateGoalType, GoalType, UpdateGoalType } from "@/data/goal/goal.dto";
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

export const getGoalById = async (goalId: string): Promise<GoalType | null> => {
  await verifySession();

  const dbGoal = await Goal.findById(goalId);
  if (!dbGoal) {
    return null;
  }

  return {
    id: dbGoal._id.toString(),
    name: dbGoal.name,
    description: dbGoal.description,
    deadline: dbGoal.deadline
  };
};

export const updateGoalById = async (
  goalId: string,
  updatedGoal: Partial<UpdateGoalType>
): Promise<GoalType | null> => {
  await verifySession();

  const dbGoal = await Goal.findByIdAndUpdate(goalId, updatedGoal, {
    new: true
  });
  if (!dbGoal) {
    return null;
  }

  return {
    id: dbGoal._id.toString(),
    name: dbGoal.name,
    description: dbGoal.description,
    deadline: dbGoal.deadline
  };
};

export const deleteGoalById = async (goalId: string): Promise<boolean> => {
  await verifySession();

  // check if goal exists
  const dbGoal = await Goal.findById(goalId);
  if (!dbGoal) {
    return false;
  }

  // remove goal from user's goals array
  const dbUser = await getUserById(dbGoal.userId);
  dbUser.goals = dbUser.goals.filter((gId) => gId.toString() !== goalId);
  await dbUser.save();

  // delete goal
  const result = await Goal.deleteOne({ _id: goalId });
  return result.deletedCount === 1;
};
