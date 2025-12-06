import { getGoals } from "@/data/goal/goal.loader";
import { REACT_QUERY_KEYS } from "@/utils/constants/query-keys";
import { useQuery } from "@tanstack/react-query";

export default function useGoals() {
  const { data: goals, isLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.GOALS],
    queryFn: getGoals
  });

  return {
    goals,
    isLoading
  };
}
