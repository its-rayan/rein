import { GoalType } from "@/data/goal/goal.dto";
import { deleteGoal } from "@/data/goal/goal.loader";
import { getQueryClient } from "@/lib/react-query/get-query-client";
import { REACT_QUERY_KEYS } from "@/utils/constants/query-keys";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteGoal() {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: (goalId: string) => {
      return deleteGoal(goalId);
    },
    onMutate: async (goalId: string) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: [REACT_QUERY_KEYS.GOALS] });

      // Snapshot the previous value
      const previousGoals = queryClient.getQueryData([REACT_QUERY_KEYS.GOALS]);

      // Optimistically update to the new value after deletion
      queryClient.setQueryData(
        [REACT_QUERY_KEYS.GOALS],
        (oldGoals: GoalType[]) => {
          if (!oldGoals) return oldGoals;
          return oldGoals.filter((goal: GoalType) => goal.id !== goalId);
        }
      );

      // Return a context object with the snapshotted value
      return { previousGoals };
    },
    onError: (err, goalId, context) => {
      queryClient.setQueryData(
        [REACT_QUERY_KEYS.GOALS],
        context?.previousGoals
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEYS.GOALS] });
    }
  });
}
