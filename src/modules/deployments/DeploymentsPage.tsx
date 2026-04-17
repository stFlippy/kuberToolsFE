import { useHosts } from "./hooks/useHosts";
import HostBlock from "./components/HostBlock";

export default function DeploymentsPage() {
  const { data, isLoading } = useHosts();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div style={styles.page}>
      <h1>Deployments</h1>

      {data?.map((host: string) => (
        <HostBlock key={host} host={host} />
      ))}
    </div>
  );
}

const styles = {
  page: {
    padding: "20px",
    color: "white",
  },
};