export async function getHosts(): Promise<string[]> {
  const res = await fetch(`/api/v1/getHosts`);

  if (!res.ok) {
    throw new Error("Failed to fetch hosts");
  }

  return res.json();
}

export async function getNamespaces(
  host: string
): Promise<string[]> {
  const res = await fetch(
    `/api/v1/namespaces?host=${host}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch namespaces");
  }

  return res.json();
}