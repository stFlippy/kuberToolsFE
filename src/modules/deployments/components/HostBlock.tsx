

import NamespaceBlock from "./NamespaceBlock";
import { useNamespaces } from "../../../shared/ui/hooks/useNamespaces";

export default function HostBlock({ host }: any) {
  const { data } = useNamespaces(host);

  return (
    <div style={styles.host}>
        <h2 style={styles.title}>{host}</h2>
        {data?.map((namespace: any) => {
              { console.log(host) }
              return <NamespaceBlock 
                key={namespace} 
                namespace={namespace}
              />
            }
          )
        }
    </div>
  );
}


const styles = {
  host: {
    background: "#020617",
    border: "1px solid #1f2937",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "24px",
  },
  title: {
    marginBottom: "12px",
    fontSize: "18px",
    fontWeight: "600",
  },
};