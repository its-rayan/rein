/*#########################################
###### Data Access File For Users #########
##########################################*/

import { verifySession } from "@/data/auth/verify-session";
import {
  IUserDocumentWithPopulatedGoals,
  UserDocumentType
} from "@/data/user/user.dto";
import User from "@/database/models/user";

export const getUserById = async (id: string): Promise<UserDocumentType> => {
  await verifySession();
  const dbUser = await User.findById(id);
  return dbUser;
};

export const populatedUserGoalsById = async (
  id: string
): Promise<IUserDocumentWithPopulatedGoals> => {
  await verifySession();
  const dbUser = await User.findById(id).populate("goals");
  return dbUser;
};
