import NamespaceBlock from "./NamespaceBlock";
import { useNamespaces } from "../hooks/useNamespaces";

export default function HostBlock({ host }: any) {
  const { data } = useNamespaces();

  return (
    <div style={styles.host}>
        <h2 style={styles.title}>{host}</h2>

        {data?.map((ns: string) => (
        <NamespaceBlock key={ns} namespace={ns} />
        ))}
    </div>
  );
}

const styles = {
  host: {
    background: "#020617",
    border: "1px solid #1f2937",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "24px",
  },
  title: {
    marginBottom: "12px",
    fontSize: "18px",
    fontWeight: "600",
  },
};