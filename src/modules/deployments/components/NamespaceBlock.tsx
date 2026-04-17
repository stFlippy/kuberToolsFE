import { useDeployments } from "../hooks/useDeployments";
import DeploymentRow from "./DeploymentRow";

export default function NamespaceBlock({ namespace }: any) {
  const { data } = useDeployments(namespace);

  return (
    <div style={styles.block}>
      <h3>{namespace}</h3>
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
  },
  empty: {
    padding: "12px",
    background: "#1f2937",
    borderRadius: "8px",
    color: "#9ca3af",
    fontStyle: "italic",
    },
};