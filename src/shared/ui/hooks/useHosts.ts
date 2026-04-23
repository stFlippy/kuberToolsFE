
import { useQuery } from "@tanstack/react-query";
import { getHosts } from "../../api/toolsApi"

export function useHosts() {
  const res = useQuery(
    {
      queryKey: ["hosts"],
      queryFn: getHosts,
      refetchInterval: 2500,
      refetchOnWindowFocus: true
    }
  )
  return res;
}