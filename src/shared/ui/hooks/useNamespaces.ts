import { useQuery } from "@tanstack/react-query";
import { getNamespaces } from "../Api/toolsApi";

export function useNamespaces(host: string) {
  return useQuery<string[]>({
    queryKey: ["namespaces", host],
    queryFn: () => getNamespaces(host),
    refetchInterval: 2500,
    refetchOnWindowFocus: true,
  });
}