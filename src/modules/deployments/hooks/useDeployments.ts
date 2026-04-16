
import { useQuery } from "@tanstack/react-query";
import { getDeployments } from "../api/deploymentsApi";

export function useDeployments(namespace: string) {
  return useQuery({
    queryKey: ["deployments", namespace],
    queryFn: () => getDeployments(namespace),
    enabled: !!namespace,
  });
}