// import { useQuery } from "@tanstack/react-query";
// import { getNamespaces } from "../../../shared/api/toolsApi";
// import { getPods } from "../api/podsApi";

// export const useAllPods = (host: string) => {
//   return useQuery({
//     queryKey: ["allPods"],
//     refetchInterval: 2500,

//     queryFn: async () => {
//       const namespaces = await getNamespaces(host);

//       const results = await Promise.all(
        
//           namespaces.map(
//             async (namespace) => {

//               const pods = await getPods(namespace, host);

//               return pods.map((pod: any) => ({      
//                 ...pod,
//                 namespace: namespace,
//               }));
//             }
//         )
//       );

//       return results.flat();
//     },
//   });
// };