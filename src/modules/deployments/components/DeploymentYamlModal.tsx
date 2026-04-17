
import { useEffect, useState } from "react";
import Modal from "../../../shared/ui/Modal";
import {
  getDeploymentYaml,
  patchDeploymentYaml,
} from "../api/deploymentsApi";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  namespace: string;
  name: string;
  onClose: () => void;
};

export default function DeploymentYamlModal({
  namespace,
  name,
  onClose,
}: Props) {
  const [yaml, setYaml] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const qc = useQueryClient();

  useEffect(() => {
    getDeploymentYaml(namespace, name).then(setYaml);
  }, []);

  return (
    <>
      <Modal title={`YAML: ${name}`} onClose={onClose}>
        <textarea
          value={yaml}
          onChange={(e) => setYaml(e.target.value)}
          style={{
            width: "100%",
            height: "70vh",
            background: "#020617",
            color: "#e2e8f0",
            border: "1px solid #1f2937",
            borderRadius: "8px",
            padding: "12px",
            fontFamily: "monospace",
            fontSize: "14px",
            resize: "none",
          }}
        />

        <button
          style={styles.button}
          onClick={() => setConfirmOpen(true)}
        >
          Apply
        </button>
      </Modal>

      {confirmOpen && (
        <Modal
          title="Confirm changes"
          onClose={() => setConfirmOpen(false)}
        >
          <div style={{ color: "white" }}>
            <p>Применить изменения?</p>

            <button
              onClick={async () => {
                await patchDeploymentYaml(namespace, name, yaml);

                qc.invalidateQueries({
                  queryKey: ["deployments", namespace],
                });

                setConfirmOpen(false);
                onClose();
              }}
            >
              Да
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

const styles = {
  textarea: {
    width: "100%",
    height: "80%",
    background: "#020617",
    color: "#e2e8f0",
    fontFamily: "monospace",
    padding: "12px",
  },
  button: {
    marginTop: "10px",
    padding: "10px",
    background: "#2563eb",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};