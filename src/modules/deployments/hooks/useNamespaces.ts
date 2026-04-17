import { useQuery } from "@tanstack/react-query";
import { getNamespaces } from "../api/deploymentsApi";

export function useNamespaces() {
  return useQuery({
    queryKey: ["namespaces"],
    queryFn: getNamespaces,
    refetchInterval: 2500,
    refetchOnWindowFocus: true,
  });
}