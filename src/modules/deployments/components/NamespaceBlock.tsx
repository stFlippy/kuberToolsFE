import { useDeployments } from "../hooks/useDeployments";
import DeploymentRow from "./DeploymentRow";

export default function NamespaceBlock({ namespace, host }: any) 
  {
    type Props = {
      namespace: string;
      host: string;
    };
    const { data } = useDeployments(namespace, host);

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
              host={host}
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
};