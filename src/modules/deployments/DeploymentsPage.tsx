import { useState } from "react";
import { useDeployments } from "./hooks/useDeployments";
import DeploymentCard from "./components/DeploymentCard";

export default function DeploymentsPage() {
  const [namespace, setNamespace] = useState("test-tool-factory");

  const { data, isLoading } = useDeployments(namespace);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Deployments</h1>

      <div style={styles.grid}>
        {data?.map((d: any) => (
          <DeploymentCard
            key={d.name}
            deployment={d}
            namespace={namespace}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap" as const,
  },
};