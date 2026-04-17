import { useDeployments } from "../hooks/useDeployments";
import DeploymentRow from "./DeploymentRow";

export default function NamespaceBlock({ namespace }: any) {
  const { data } = useDeployments(namespace);

  return (
    <div style={styles.block}>
      <h3 style={styles.title}>{namespace}</h3>

      {!data || data.length === 0 ? (
        <div style={styles.empty}>empty namespace</div>
      ) : (
        data.map((d: any) => (
          <DeploymentRow
            key={d.name}
            deployment={d}
            namespace={namespace}
          />
        ))
      )}
    </div>
  );
}

const styles = {
  block: {
    marginBottom: "20px",
    padding: "12px",
    borderRadius: "10px",
    background: "#020617",
    border: "1px solid #1f2937",
  },
  title: {
    marginBottom: "10px",
    fontSize: "14px",
    color: "#9ca3af",
  },
  empty: {
    padding: "10px",
    background: "#1f2937",
    borderRadius: "6px",
    color: "#6b7280",
    fontSize: "13px",
  },
};