
import { useState } from "react";
import DeploymentYamlModal from "./DeploymentYamlModal";
import { setReplicas } from "../api/deploymentsApi";

type Props = {
  deployment: any;
  namespace: string;
};

export default function DeploymentCard({
  deployment,
  namespace,
}: Props) {
  const [showYaml, setShowYaml] = useState(false);
  const [replicas, setReplicasState] = useState(
    deployment.replicas
  );

  return (
    <div style={styles.card}>
      <h3>{deployment.name}</h3>

      <div>Image: {deployment.image}</div>
      <div>
        Replicas: {deployment.availableReplicas} /{" "}
        {deployment.replicas}
      </div>

      <input
        type="number"
        value={replicas}
        onChange={(e) =>
          setReplicasState(Number(e.target.value))
        }
      />

      <button
        onClick={() =>
          setReplicas(namespace, deployment.name, replicas)
        }
      >
        Apply replicas
      </button>

      <button onClick={() => setShowYaml(true)}>
        YAML
      </button>

      {showYaml && (
        <DeploymentYamlModal
          namespace={namespace}
          name={deployment.name}
          onClose={() => setShowYaml(false)}
        />
      )}
    </div>
  );
}

const styles = {
  card: {
    background: "#1f2937",
    padding: "16px",
    borderRadius: "10px",
    color: "white",
    width: "300px",
  },
};