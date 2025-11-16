/*#########################################################
###### Schema And Types For Data Transfer #################
##########################################################*/

import { IGoal } from "@/database/models/goal";
import { IUser } from "@/database/models/user";

// User model return from DB
export type UserDocumentType = IUser;

export interface IUserDocumentWithPopulatedGoals extends Omit<IUser, "goals"> {
  goals: IGoal[];
}
