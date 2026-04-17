import { useState } from "react";
import {
  setReplicas,
  restartNamespace,
} from "../api/deploymentsApi";
import { useQueryClient } from "@tanstack/react-query";
import DeploymentYamlModal from "./DeploymentYamlModal";
import styles from "./DeploymentRow.module.css"

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
      <div className={styles.row}>
        <div className={styles.name}>{deployment.name}</div>

        <button className={styles.button} onClick={restart}>
          Reload
        </button>

        <div
          style={{
            color:
              deployment.availableReplicas === deployment.replicas
                ? "#22c55e"
                : "#f59e0b",
            fontWeight: "600",
          }}
        >
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
          className={styles.button}
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
