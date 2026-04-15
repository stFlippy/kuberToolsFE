import { useQuery } from "@tanstack/react-query";
import { getNamespaces } from "../../../api/toolsApi";
import { getPods } from "../api/podsApi";

export const useAllPods = () => {
  return useQuery({
    queryKey: ["allPods"],
    queryFn: async () => {
      const namespaces = await getNamespaces();

      const results = await Promise.all(
        namespaces.map(async (ns) => {
          const pods = await getPods(ns);

          return pods.map((pod: any) => ({
            ...pod,
            namespace: ns,
          }));
        })
      );

      return results.flat();
    },
  });
};