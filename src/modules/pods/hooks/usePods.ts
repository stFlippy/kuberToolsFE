
import { useQuery } from "@tanstack/react-query";
import { getPods } from "../../../api/podsApi";

export const usePods = (namespace: string) => {
    return useQuery(
        {
            queryKey: ['pods', namespace],
            queryFn: () => getPods(namespace),
            enabled: !!namespace
        }
    )
}