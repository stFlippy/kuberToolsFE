import { useQuery } from "@tanstack/react-query";
import { getPodLogs } from "../api/podsApi";
import Modal from "../../../shared/ui/Modal";

type Props = {
  namespace: string;
  podName: string;
  onClose: () => void;
};

function LogsModal({ namespace, podName, onClose }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ["logs", podName],
    queryFn: () => getPodLogs(namespace, podName),
  });

  return (
    <Modal title={`Logs: ${podName}`} onClose={onClose}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <pre style={styles.logs}>
          {data?.join("\n")}
        </pre>
      )}
    </Modal>
  );
}

export default LogsModal;

const styles = {
  logs: {
    background: "#020617",
    color: "#22c55e",
    padding: "16px",
    borderRadius: "8px",
    fontSize: "13px",
    lineHeight: "1.4",
    height: "100%",
    overflow: "auto",
  },
};