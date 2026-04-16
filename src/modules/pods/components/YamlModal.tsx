import { useQuery } from "@tanstack/react-query";
import { getPodYaml } from "../api/podsApi";
import Modal from "../../../shared/ui/Modal";

type Props = {
  namespace: string;
  podName: string;
  onClose: () => void;
};

function YamlModal({ namespace, podName, onClose }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ["yaml", podName],
    queryFn: () => getPodYaml(namespace, podName),
  });

  return (
    <Modal title={`YAML: ${podName}`} onClose={onClose}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <pre style={styles.yaml}>{data}</pre>
      )}
    </Modal>
  );
}

export default YamlModal;

const styles = {
  yaml: {
    background: "#020617",
    color: "#e2e8f0",
    padding: "16px",
    borderRadius: "8px",
    fontSize: "13px",
    whiteSpace: "pre-wrap" as const,
  },
};