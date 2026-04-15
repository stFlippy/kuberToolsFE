import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getNamespaces } from "../../api/toolsApi";
import { usePods } from "./hooks/usePods";
import PodsTable from "./components/PodsTable";

function PodsPage() {
  const [namespace, setNamespace] = useState("");

  // namespaces
  const {
    data: namespaces,
    isLoading: nsLoading,
    error: nsError,
  } = useQuery({
    queryKey: ["namespaces"],
    queryFn: getNamespaces,
  });

  // pods
  const {
    data: pods,
    isLoading: podsLoading,
    error: podsError,
  } = usePods(namespace);

  if (nsLoading) return <div>Loading namespaces...</div>;
  if (nsError) return <div>Error loading namespaces</div>;

  return (
    <div>
      <h1>Pods</h1>

      {/* selector */}
      <select
        value={namespace}
        onChange={(e) => setNamespace(e.target.value)}
        style={styles.select}
      >
        <option value="">Select namespace</option>
        {namespaces?.map((ns: string) => (
          <option key={ns} value={ns}>
            {ns}
          </option>
        ))}
      </select>

      {/* pods */}
      {podsLoading && <div>Loading pods...</div>}
      {podsError && <div>Error loading pods</div>}

      {pods && <PodsTable pods={pods} />}
    </div>
  );
}

export default PodsPage;

const styles = {
  select: {
    marginBottom: "20px",
    padding: "8px",
  },
};