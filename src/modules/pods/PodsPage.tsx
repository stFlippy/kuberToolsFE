import { useAllPods } from "./hooks/useAllPods";
import NamespaceBlock from "./components/NamespaceBlock";

function PodsPage() {
  const { data, isLoading } = useAllPods();

  if (isLoading) return <div>Loading...</div>;

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

      {Object.entries(grouped).map(([ns, pods]: any) => (
        <NamespaceBlock key={ns} namespace={ns} pods={pods} />
      ))}
    </div>
  );
}

export default PodsPage;