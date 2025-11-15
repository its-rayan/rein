/*#########################################################
###### Schema And Types For Data Transfer #################
##########################################################*/

import { IUser } from "@/database/models/user";

// User model return from DB
export type UserDocumentType = IUser;
