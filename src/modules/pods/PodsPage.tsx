import { useAllPods } from "./hooks/useAllPods";
import NamespaceBlock from "./components/NamespaceBlock";
import { useState } from "react";
import { restartSelected } from "./api/podsApi";
import { useEffect } from "react";
// import { useNamespaces } from "../../shared/ui/hooks/useNamespaces";

function PodsPage() {
  const { data = [], isLoading } = useAllPods();
  const [selectedPodIds, setSelectedPodIds] = useState<string[]>([]);

  useEffect(() => {
    if (data.length === 0) return;
    const activeIds = new Set(data.map((pod: any) => `${pod.namespace}/${pod.name}`));
    setSelectedPodIds((prev) => prev.filter((id) => activeIds.has(id)));
  }, [data]);

  if (isLoading) return <div>Loading...</div>;

  const togglePod = (ns: string, name: string) => {
    const id = `${ns}/${name}`;
    setSelectedPodIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleRestartSelected = async () => {
    // 1. Собираем объект для отправки
    const payload: Record<string, string[]> = {};
    
    selectedPodIds.forEach(id => {
      const [ns, name] = id.split('/');
      if (!payload[ns]) payload[ns] = [];
      payload[ns].push(name);
    });

    // 2. Отправляем в API
    try {
      const response = await restartSelected(payload);
      if (response.ok) {
        alert("Запрос на рестарт отправлен");
        setSelectedPodIds([]); // Очищаем выбор
        // Если есть react-query, можно инвалидировать кеш:
        // queryClient.invalidateQueries({ queryKey: ["allPods"] });
      }
    } catch (err) {
      console.error("Ошибка рестарта:", err);
    }
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
      {/* <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}> */}

      <div style={styles.page}>
        <h1>Pods</h1>
        {selectedPodIds.length > 0 && (
          <button 
            onClick={handleRestartSelected}
            style={{ padding: '8px 16px', background: '#ef4444', color: 'white', borderRadius: '6px', cursor: 'pointer', border: 'none' }}
          >
            Restart Selected ({selectedPodIds.length})
          </button>
        )}

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
    </div>
  );
}

export default PodsPage;

const styles = {
  page: {
    padding: "20px",
    background: "#020617",
    minHeight: "100vh",
    color: "#e5e7eb",
  },
};