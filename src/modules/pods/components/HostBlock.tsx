

import { useNamespaces } from "../../../shared/ui/hooks/useNamespaces";


export default function hostBlock(host: any) {
    const namespaces = useNamespaces(host)

    return (
        <div
        style={styles.title}>
            {host}
        </div>
    )
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