import { useQuery } from "@tanstack/react-query";
import { getPods } from "../api/podsApi";
import PodCard from "./PodCard";

type Props = {
  host: string;
  namespace: string;
  selectedPodIds: string[];
  onToggle: (
    host: string,
    namespace: string,
    podName: string
  ) => void;
};

function NamespaceBlock({
  host,
  namespace,
  selectedPodIds,
  onToggle,
}: Props) {
  const { data: pods = [] } = useQuery({
    queryKey: ["pods", namespace],
    queryFn: () => getPods(namespace),
    refetchInterval: 2500,
    refetchOnWindowFocus: true,
  });

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>{namespace}</h3>

      {pods.length === 0 ? (
        <div style={styles.empty}>
          empty namespace
        </div>
      ) : (
        <div style={styles.grid}>
          {pods.map((pod: any) => (
            <PodCard
              key={pod.name}
              pod={{
                ...pod,
                namespace,
              }}
              isSelected={selectedPodIds.includes(
                `${host}/${namespace}/${pod.name}`
              )}
              onToggle={() =>
                onToggle(host, namespace, pod.name)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default NamespaceBlock;

const styles = {
  container: {
    marginBottom: "20px",
    padding: "12px",
    borderRadius: "10px",
    background: "#0f172a",
    border: "1px solid #1f2937",
  },

  title: {
    marginBottom: "12px",
    fontSize: "14px",
    color: "#9ca3af",
    fontWeight: "600",
  },

  empty: {
    padding: "12px",
    background: "#1f2937",
    borderRadius: "8px",
    color: "#6b7280",
    fontSize: "13px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 220px)",
    gap: "12px",
  },
};