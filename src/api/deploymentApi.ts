
export const getDeployments = async(namespace: string) => {

    const res = await fetch(`/api/v1/deployments?namespace=${namespace}`);

    if (!res.ok) {
        throw new Error("Failed to fetch pods");
    }

    return res.json();
}