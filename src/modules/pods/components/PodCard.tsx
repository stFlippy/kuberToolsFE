import { useState } from "react";
import DropdownMenu from "./DropdownMenu";
import LogsModal from "./LogsModal";
import YamlModal from "./YamlModal";
import PatchModal from "./PatchModal";
import { restartPod } from "../api/podsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "./PodCard.module.css"

type Props = {
  pod: any;
  isSelected: boolean;
  onToggle: () => void;
};


function PodCard({ pod, isSelected, onToggle }: Props) {
  const [showLogs, setShowLogs] = useState(false);
  const [showYaml, setShowYaml] = useState(false);
  const [showPatch, setShowPatch] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    {
    mutationFn: () => restartPod(pod.namespace, pod.name),
    onSuccess: async () => {
        await new Promise((r) => setTimeout(r, 1000));
        await queryClient.invalidateQueries({ queryKey: ["allPods"],  });
      },
    }
  );


function formatDate(dateStr: string) {
  const date = new Date(dateStr);

  return date.toLocaleString(undefined, {
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}
;

  return (
    <div
    onClick={onToggle}
      className={styles.card}

    >
      <div className={styles.header}>
        <input 
          type="checkbox" 
          checked={isSelected} 
          onChange={() => {}} 
          className={styles.checkbox}
        />

        <span title={pod.name} className={styles.name}>
          {pod.name}
        </span>
        
        <div style={{ marginLeft: 'auto' }} onClick={(e) => e.stopPropagation()}>
          <DropdownMenu
          menu={
            <>
              <div
                className={styles.menuItem}
                onClick={() => mutation.mutate()}
              >
                Restart
              </div>

              <div
                className={styles.menuItem}
                onClick={() => {
                  setShowLogs(true);
                  setShowYaml(false);
                }}
              >
                Logs
              </div>

              <div
                className={styles.menuItem}
                onClick={() => {
                  setShowYaml(true);
                  setShowLogs(false);
                }}
              >
                YAML
              </div>
              <div
                className={styles.menuItem}
                onClick={() => {
                  setShowPatch(true);
                  setShowLogs(false);
                  setShowYaml(false);
                }}
              >
                Patch
              </div>
            </>
          }
          >
            <span className={styles.menuBtn}>⋮</span>
          </DropdownMenu>
        </div>
      </div>

      <div 
        title={pod.status}
        className={`
          ${styles.status} 
          ${pod.status === "Running" ? styles.running : ""}
          ${(pod.status === "Pending" || pod.status === "Succeeded") ? styles.pending : ""}
        `}
      >
        {pod.status}
      </div>

      <div className={styles.info}>
        <div>Restarts: {pod.restartCount}</div>
        <div>{formatDate(pod.creationTimestamp)}</div>
      </div>

      {showLogs && (
        <LogsModal
          namespace={pod.namespace}
          podName={pod.name}
          onClose={() => setShowLogs(false)}
        />
      )}

      {showYaml && (
        <YamlModal
          namespace={pod.namespace}
          podName={pod.name}
          onClose={() => setShowYaml(false)}
        />
      )}
      {showPatch && (
        <PatchModal
          namespace={pod.namespace}
          podName={pod.name}
          onClose={() => setShowPatch(false)}
        />
      )}
    </div>
  );
}

export default PodCard;