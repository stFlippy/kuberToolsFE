

export const getPods = async (namespace: string, host: string) => {
  const res = await fetch(
    `/api/v1/pods?namespace=${namespace}&host=${host}`
  );

  if (!res.ok) throw new Error("Failed to fetch pods");

  return res.json();
};

export const restartPod = async (namespace: string, podName: string, host: string) => {
  const res = await fetch(
    `/api/v1/pods/restartPod?namespace=${namespace}&podName=${podName}&host=${host}`
  );

  if (!res.ok) throw new Error("Failed to restart pod");
};

export const getPodLogs = async (namespace: string, podName: string, host: string) => {
  const res = await fetch(
    `/api/v1/pods/log?namespace=${namespace}&podName=${podName}&host=${host}`
  );

  if (!res.ok) throw new Error("Failed to fetch logs");

  return res.json();
};

export const getPodYaml = async (namespace: string, podName: string, host: string) => {
  const res = await fetch(
    `/api/v1/pods/yaml?namespace=${namespace}&podName=${podName}&host=${host}`
  );

  if (!res.ok) throw new Error("Failed to fetch yaml");

  return res.text();
};

export async function patchPodYaml(
  namespace: string,
  podName: string,
  body: string,
  host: string
) {
  const res = await fetch(
    `/api/v1/pods/yaml?namespace=${namespace}&podName=${podName}&host=${host}`,
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

export async function restartSelected(
  body: Record<string, Record<string, string[]>>
) {
  const res = await fetch(
    `/api/v1/pods/restartSelected`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  return res;
}