import NamespaceBlock from "./NamespaceBlock";
import { useNamespaces } from "../hooks/useNamespaces";

export default function HostBlock({ host }: any) {
  const { data } = useNamespaces();

  return (
    <div style={styles.host}>
      <h2>{host}</h2>

      {data?.map((ns: string) => (
        <NamespaceBlock key={ns} namespace={ns} />
      ))}
    </div>
  );
}

const styles = {
  host: {
    marginBottom: "40px",
  },
};