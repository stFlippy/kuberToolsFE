

export const getPods = async (namespace: string) => {
  const res = await fetch(
    `/api/v1/pods?namespace=${namespace}`
  );

  if (!res.ok) throw new Error("Failed to fetch pods");

  return res.json();
};

export const restartPod = async (namespace: string, podName: string) => {
  const res = await fetch(
    `/api/v1/pods/restartPod?namespace=${namespace}&podName=${podName}`
  );

  if (!res.ok) throw new Error("Failed to restart pod");
};

export const getPodLogs = async (namespace: string, podName: string) => {
  const res = await fetch(
    `/api/v1/pods/log?namespace=${namespace}&podName=${podName}`
  );

  if (!res.ok) throw new Error("Failed to fetch logs");

  return res.json();
};

export const getPodYaml = async (namespace: string, podName: string) => {
  const res = await fetch(
    `/api/v1/pods/yaml?namespace=${namespace}&podName=${podName}`
  );

  if (!res.ok) throw new Error("Failed to fetch yaml");

  return res.text();
};

export async function patchPodYaml(
  namespace: string,
  podName: string,
  body: string
) {
  const res = await fetch(
    `/api/v1/pods/yaml?namespace=${namespace}&podName=${podName}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "text/plain",
      },
      body,
    }
  );

  return res;
}