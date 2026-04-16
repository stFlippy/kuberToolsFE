import PodCard from "./PodCard";

type Props = {
  namespace: string;
  pods: any[];
  selectedPodIds: string[];
  onToggle: (ns: string, name: string) => void; 
};

function NamespaceBlock({ namespace, pods, selectedPodIds, onToggle }: Props) {
  return (
    <div style={styles.container}>
      <h3>{namespace}</h3>

      <div style={styles.grid}>
        {pods.map((pod) => (
          <PodCard 
            key={pod.name}
            pod={pod}
            isSelected={selectedPodIds.includes(`${namespace}/${pod.name}`)} 
            onToggle={() => onToggle(namespace, pod.name)} 
          />
        ))}
      </div>
    </div>
  );
}

export default NamespaceBlock;

const styles = {
  container: {
    marginBottom: "30px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 220px)",
    gap: "12px",
  },
};