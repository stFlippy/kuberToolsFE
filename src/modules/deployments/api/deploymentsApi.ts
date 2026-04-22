
export async function getHosts(): Promise<string[]> {
  const res = await fetch(`/api/v1/getHosts`);
  return res.json();
}

export async function getNamespaces(): Promise<string[]> {
  const res = await fetch(`/api/v1/namespaces`);
  return res.json();
}


export async function getDeployments(namespace: string, host: string) {
  const res = await fetch(
    `/api/v1/deployments?namespace=${namespace}&host=${host}`
  );
  return res.json();
}

export async function getDeploymentYaml(
  namespace: string,
  name: string,
  host: string
) {
  const res = await fetch(
    `/api/v1/deployments/yaml?namespace=${namespace}&deploymentName=${name}&host=${host}`
  );
  return res.text();
}

export async function patchDeploymentYaml(
  namespace: string,
  name: string,
  body: string,
  host: string
) {
  return fetch(
    `/api/v1/deployments/yaml?namespace=${namespace}&deploymentName=${name}&host=${host}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "text/plain",
      },
      body,
    }
  );
}

export async function setReplicas(
  host: string,
  namespace: string,
  name: string,
  replicas: number
) {
  return fetch(
    `/api/v1/deployments/setReplicas?namespace=${namespace}&deploymentName=${name}&replicasValue=${replicas}&host=${host}`
  );
}

export async function restartNamespace(namespace: string, host: string) {
  return fetch(
    `/api/v1/deployments/restartNamespacedPods?namespace=${namespace}&host=${host}`
  );
}