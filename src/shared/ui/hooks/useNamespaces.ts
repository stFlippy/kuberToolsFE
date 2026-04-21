import { useQuery } from "@tanstack/react-query";
import { getNamespaces } from "../Api/toolsApi";
// import { getHosts } from "../Api/toolsApi";

export function useNamespaces(host: string) {

  return useQuery<any[][]>(
    {
      queryKey: ["namespaces"],
      queryFn: () => getNamespaces(host),
      refetchInterval: 2500,
      refetchOnWindowFocus: true,
    }
  )
} 