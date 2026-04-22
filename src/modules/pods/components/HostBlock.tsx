import { useNamespaces } from "../../../shared/ui/hooks/useNamespaces";
import NamespaceBlock from "./NamespaceBlock";

export default function HostBlock({
  host,
  selectedPodIds,
  onToggle,
}: any) {
  const { data: namespaces = [] } = useNamespaces(host);

  return (
    <div style={styles.host}>
      <h2 style={styles.title}>{host}</h2>

      {namespaces.map((namespace: string) => (
        <NamespaceBlock
          host={host}
          key={namespace}
          namespace={namespace}
          selectedPodIds={selectedPodIds}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

const styles = {
  host: {
    background: "#111827",
    border: "1px solid #374151",
    borderRadius: "14px",
    padding: "18px",
    marginBottom: "24px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
  },

  title: {
    marginBottom: "16px",
    fontSize: "18px",
    fontWeight: "600",
    color: "#f8fafc",
    paddingBottom: "8px",
    borderBottom: "1px solid #1f2937",
  },
};