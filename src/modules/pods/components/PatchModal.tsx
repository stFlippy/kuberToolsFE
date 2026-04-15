import { useState } from "react";
import Modal from "../components/Modal";
import { patchPodYaml } from "../../../api/podsApi";

type Props = {
  namespace: string;
  podName: string;
  onClose: () => void;
};

export default function PatchModal({
  namespace,
  podName,
  onClose,
}: Props) {
  const [value, setValue] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleSubmit = async () => {
    await patchPodYaml(namespace, podName, value);
    onClose();
  };

  return (
    <Modal title={`Patch: ${podName}`} onClose={onClose}>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={styles.textarea}
        placeholder='[{"op":"add","path":"/metadata/labels/test","value":"123"}]'
      />

      <button
        style={styles.button}
        onClick={() => setConfirmOpen(true)}
        >
        Apply Patch
      </button>
      {confirmOpen && (
        <Modal title="Confirm patch" onClose={() => setConfirmOpen(false)}>
          <div style={styles.confirmBox}>
            <p>Вы уверены, что хотите применить изменения?</p>

            <div style={styles.actions}>
              <button
                style={styles.cancel}
                onClick={() => setConfirmOpen(false)}
              >
                Отмена
              </button>

              <button
                style={styles.confirm}
                onClick={async () => {
                  await patchPodYaml(namespace, podName, value);
                  setConfirmOpen(false);
                  onClose();
                }}
              >
                Подтвердить
              </button>
            </div>
          </div>
        </Modal>
      )}
    </Modal>


  );
}

const styles = {
  textarea: {
    width: "95%",
    height: "70%",
    background: "#020617",
    color: "#e2e8f0",
    padding: "12px",
    borderRadius: "8px",
    fontFamily: "monospace",
  },
  button: {
    marginTop: "12px",
    padding: "10px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  confirmBox: {
    color: "white",
  },

  actions: {
    marginTop: "20px",
    display: "flex",
    gap: "10px",
  },

  cancel: {
    padding: "8px 12px",
    background: "#374151",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  confirm: {
    padding: "8px 12px",
    background: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};