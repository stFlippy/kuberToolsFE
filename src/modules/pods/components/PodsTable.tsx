
type Pod = {
    name: string;
    creationTimestamp: string;
    restartCount: string;
}

type Props = {
    pods: Pod[];
}

function PodsTable({ pods }: Props) {
    return (
        <table style={styles.table}>
        <thead>
            <tr>
            <th>Name</th>
            <th>creationTimestamp</th>
            <th>restartCount</th>
            </tr>
        </thead>pod

        <tbody>
            {pods.map((pod) => (
            <tr key={pod.name}>
                <td>{pod.name}</td>
                <td>{pod.creationTimestamp}</td>
                <td>{pod.restartCount}</td>
            </tr>
            ))}
        </tbody>
        </table>
  );
}

export default PodsTable;

const styles = {
    table: {
        width: "100%",
        borderCollapse: "collapse" as const
    }
}

