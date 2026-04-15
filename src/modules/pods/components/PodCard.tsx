import { useState } from "react";
import DropdownMenu from "./DropdownMenu";
import LogsModal from "./LogsModal";
import YamlModal from "./YamlModal";
import { restartPod } from "../../../api/podsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  pod: any;
};


function PodCard({ pod }: Props) {
  const [showLogs, setShowLogs] = useState(false);
  const [showYaml, setShowYaml] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    {
    mutationFn: () => restartPod(pod.namespace, pod.name),
    onSuccess: async () => {
        await new Promise((r) => setTimeout(r, 1000));
        await queryClient.invalidateQueries({ queryKey: ["allPods"] });
      },
    }
  );

  return (
    <div
      style={styles.card}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.6)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)")
      }
    >
      <div style={styles.header}>
        <span style={styles.name}>{pod.name}</span>

        <DropdownMenu
          menu={
            <>
              <div
                style={styles.menuItem}
                onClick={() => mutation.mutate()}
              >
                Restart
              </div>

              <div
                style={styles.menuItem}
                onClick={() => {
                  setShowLogs(true);
                  setShowYaml(false);
                }}
              >
                Logs
              </div>

              <div
                style={styles.menuItem}
                onClick={() => {
                  setShowYaml(true);
                  setShowLogs(false);
                }}
              >
                YAML
              </div>
            </>
          }
        >
          <span style={styles.menuBtn}>⋮</span>
        </DropdownMenu>
      </div>

      <div style={styles.info}>
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
    </div>
  );
}

export default PodCard;

function formatDate(dateStr: string) {
  const date = new Date(dateStr);

  return date.toLocaleString(); // 🔥 локальное время
}

const styles = {
  card: {
    background: "#1f2937",
    padding: "12px",
    borderRadius: "10px",
    color: "white",

    width: "220px",
    height: "120px",

    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "space-between",

    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  cardHover: {
    transform: "translateY(-3px)",
    boxShadow: "0 6px 16px rgba(0,0,0,0.5)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  menuBtn: {
    cursor: "pointer",
  },
  info: {
    fontSize: "12px",
    opacity: 0.8,
  },
  name: {
    maxWidth: "160px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap" as const,
  },
  menuItem: {
    padding: "8px",
    cursor: "pointer",
    borderRadius: "6px",
  },
};