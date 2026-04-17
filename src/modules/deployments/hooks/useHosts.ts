
import { useQuery } from "@tanstack/react-query";
import { getHosts } from "../api/deploymentsApi";

export function useHosts() {
  return useQuery({
    queryKey: ["hosts"],
    queryFn: getHosts,
    refetchInterval: 2500,
    refetchOnWindowFocus: true,
  });
}