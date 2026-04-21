
export const getHosts = async(): Promise<string[]> =>
    {   
        const res = await fetch(
            `/api/v1/getHosts`
        )
        return res.json();
    }



export async function getNamespaces(hosts: string){
    const response = await fetch(
        `/api/v1/namespaces?hosts=${hosts}`
    )
    return response.json();
}