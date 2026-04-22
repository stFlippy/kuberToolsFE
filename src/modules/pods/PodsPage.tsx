import { useState, useEffect } from "react";
import { useHosts } from "../../shared/ui/hooks/useHosts";
import HostBlock from "./components/HostBlock";
import { restartSelected } from "./api/podsApi";
import { useAllPods } from "./hooks/useAllPods";

function PodsPage() {
  const { data: hosts = [], isLoading } = useHosts();

  const [selectedPodIds, setSelectedPodIds] = useState<string[]>([]);

  useEffect(() => {
    setSelectedPodIds((prev) =>
      prev.filter((id) => {
        const parts = id.split("/");
        return parts.length === 3;
      })
    );
  }, []);

  if (isLoading) return <div>Loading...</div>;

  const togglePod = (
    host: string,
    namespace: string,
    podName: string
  ) => {
    const id = `${host}/${namespace}/${podName}`;

    setSelectedPodIds((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  const handleDropSelected = async () => {
    if (selectedPodIds.length === 0) return;

    const confirmed = window.confirm(
      "Подтвердить удаление выбранных pod?"
    );

    if (!confirmed) return;

    const payload: Record<string, Record<string, string[]>
      > = {};

    selectedPodIds.forEach((id) => {
      const [host, namespace, podName] = id.split("/");

      if (!payload[host]) {
        payload[host] = {};
      }

      if (!payload[host][namespace]) {
        payload[host][namespace] = [];
      }

      payload[host][namespace].push(podName);
    });

    await restartSelected(payload);

    setSelectedPodIds([]);
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Pods</h1>

      {selectedPodIds.length > 0 && (
        <button
          style={styles.restartButton}
          onClick={handleDropSelected}
        >
          Drop Selected ({selectedPodIds.length})
        </button>
      )}

      {hosts.map((host: string) => (
        <HostBlock
          key={host}
          host={host}
          selectedPodIds={selectedPodIds}
          onToggle={togglePod}
        />
      ))}
    </div>
  );
}

export default PodsPage;

const styles = {
  page: {
    padding: "20px",
    background: "#020617",
    minHeight: "100vh",
    color: "#e5e7eb",
  },

  title: {
    marginBottom: "24px",
    fontSize: "28px",
    fontWeight: "700",
  },

  restartButton: {
    marginBottom: "20px",
    padding: "10px 16px",
    background: "#374151",
    color: "white",
    border: "1px solid #4b5563",
    borderRadius: "8px",
    cursor: "pointer",
  },
};