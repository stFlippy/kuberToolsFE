import { useAllPods } from "./hooks/useAllPods";
import NamespaceBlock from "./components/NamespaceBlock";
import { useState } from "react";

function PodsPage() {
  const { data = [], isLoading } = useAllPods();

  if (isLoading) return <div>Loading...</div>;

  const [selectedPodIds, setSelectedPodIds] = useState<string[]>([]);
  const togglePod = (podId: string) => {
    setSelectedPodIds(prev =>
      prev.includes(podId)
        ? prev.filter(id => id !== podId)
        : [...prev, podId]
    );
  };

  // группировка по namespace
  const grouped = data.reduce((acc: any, pod: any) => {
    if (!acc[pod.namespace]) {
      acc[pod.namespace] = [];
    }

    acc[pod.namespace].push(pod);
    return acc;
  }, {});

  return (
    <div>
      <h1>Pods</h1>
      <h3>Pods selected : {selectedPodIds.length}</h3>

      {Object.entries(grouped).map(([ns, pods]: any) => (
        <NamespaceBlock
          key={ns} 
          namespace={ns} 
          pods={pods} 
          selectedPodIds={selectedPodIds} // Передаем список выбранных
          onToggle={togglePod}            // Передаем саму функцию клика
        />
      ))}
    </div>
  );
}

export default PodsPage;