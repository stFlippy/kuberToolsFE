
export const getNamespaces = async() => {
    const res = await fetch("/api/v1/namespaces");
    return res.json();
}