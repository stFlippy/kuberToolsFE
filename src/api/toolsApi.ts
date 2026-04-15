
export const getNamespaces = async(): Promise<string[]> => {
    const res = await fetch('/api/v1/namespace');
    if (!res.ok) {
        throw new Error("Failed to fetch namespaces");
    }

    return res.json();
}