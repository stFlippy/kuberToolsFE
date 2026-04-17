import { useState } from "react";
import {
  setReplicas,
  restartNamespace,
} from "../api/deploymentsApi";
import { useQueryClient } from "@tanstack/react-query";
import DeploymentYamlModal from "./DeploymentYamlModal";

export default function DeploymentRow({
  deployment,
  namespace,
}: any) {
  const [value, setValue] = useState("0");
  const isSame = Number(value) === deployment.replicas;
  const isDisabled = value === "0" || isSame;
  const [showYaml, setShowYaml] = useState(false);
  

  const qc = useQueryClient();

  const applyReplicas = async () => {
    if (isDisabled) return;

    if (!confirm("Применить новое количество реплик?")) return;

    await setReplicas(namespace, deployment.name, Number(value));

    setValue("0");

    qc.invalidateQueries({
      queryKey: ["deployments", namespace],
    });
  };



  const restart = async () => {
    if (!confirm("Перезапустить все pod'ы namespace?")) return;

    await restartNamespace(namespace);
    qc.invalidateQueries({
      queryKey: ["deployments", namespace],
    });
  };

  return (
    <>
      <div style={styles.row}>
        <div style={styles.name}>{deployment.name}</div>

        <button style={styles.button} onClick={restart}>
          Reload
        </button>

        <div>
          {deployment.availableReplicas}/{deployment.replicas}
        </div>

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{
            padding: "6px",
            background: "#111827",
            color: "white",
            border: "1px solid #374151",
            borderRadius: "6px",
          }}
        />

        <button
          disabled={isDisabled}
          onClick={applyReplicas}
          style={{
            background: "#374151",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "6px 10px",
            cursor: isDisabled ? "not-allowed" : "pointer",
            opacity: isDisabled ? 0.5 : 1,
          }}
        >
          OK
        </button>

        <button
          style={styles.button}
          onClick={() => setShowYaml(true)}
        >
          Edit YAML
        </button>
      </div>

      {showYaml && (
        <DeploymentYamlModal
          namespace={namespace}
          name={deployment.name}
          onClose={() => setShowYaml(false)}
        />
      )}
    </>
  );
}

const styles = {
  row: {
    display: "grid",
    gridTemplateColumns: "2fr 100px 100px 80px 80px 120px",
    alignItems: "center",
    gap: "10px",
    padding: "10px",
    background: "#1f2937",
    borderRadius: "8px",
    marginBottom: "8px",
  },
  name: { color: "white" },
  ok: {
    background: "#16a34a",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  reload: {
    background: "#f59e0b",
    border: "none",
    cursor: "pointer",
  },
  yaml: {
    background: "#2563eb",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  button: {
    background: "#374151",
    color: "#e5e7eb",
    border: "none",
    borderRadius: "6px",
    padding: "6px 10px",
    cursor: "pointer",
    transition: "0.2s",
    },

  buttonHover: {
    background: "#4b5563",
  },
  input: {
    padding: "6px",
    background: "#111827",
    color: "white",
    border: "1px solid #374151",
    borderRadius: "6px",
  },
};