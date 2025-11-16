/*#########################################################
###### Schema And Types For Data Transfer #################
##########################################################*/

import z from "zod";

export const createGoalSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  deadline: z.date().optional()
});

export type CreateGoalType = z.infer<typeof createGoalSchema>;

export const updateGoalSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  deadline: z.date().optional(),
  status: z
    .enum(["not_started", "in_progress", "completed", "abandoned"])
    .default("not_started")
    .optional(),
  progress: z.number().max(100).default(0).optional()
});

export type UpdateGoalType = z.infer<typeof updateGoalSchema>;

// Goal model return from DB
export const goalSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  deadline: z.date().optional()
});

export type GoalType = z.infer<typeof goalSchema>;
