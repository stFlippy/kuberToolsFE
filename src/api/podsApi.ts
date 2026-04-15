
export const getPods = async(namespace: string) => {

    const res = await fetch(`/api/v1/pods?namespace=${namespace}`);

    if (!res.ok) {
        throw new Error("Failed to fetch pods");
    }

    return res.json();
}