import { useQuery } from "@tanstack/react-query";
import { getDeployments } from "../api/deploymentsApi";

export function useDeployments(
  namespace: string,
  host: string
) {
  return useQuery({
    queryKey: ["deployments", namespace, host],
    queryFn: () => getDeployments(namespace, host),
    enabled: !!namespace && !!host,
    refetchInterval: 2500,
    refetchOnWindowFocus: true,
  });
}