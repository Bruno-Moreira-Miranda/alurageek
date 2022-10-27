import { IProduto } from "interfaces/IProduto";

class ProdutosApiConnection {
    static baseUrl = "http://localhost:8080/produtos";

    async get(query?: string) {
        const requestInit: RequestInit = {
            method: "GET",
            mode: "cors",
            headers: {
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        };

        const endPoint = query ? this.itemEndPoint(query) : ProdutosApiConnection.baseUrl;

        const response = await fetch(endPoint, requestInit);

        return response;
    }

    async post(produto: IProduto) {

        const requestInit: RequestInit = {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(produto),
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        };

        const response = await fetch(ProdutosApiConnection.baseUrl, requestInit);

        return response;
    }

    async patch(atts: Partial<IProduto>, id: string) {
        const requestInit: RequestInit = {
            method: "PATCH",
            mode: "cors",
            body: JSON.stringify(atts),
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        };

        const response = await fetch(this.itemEndPoint(id), requestInit);

        return response;
    }

    async delete(id: string) {
        const requestInit: RequestInit = {
            method: "DELETE",
            mode: "cors",
        };

        const response = await fetch(this.itemEndPoint(id), requestInit);

        return response;
    }

    private itemEndPoint(id: string) {
        return `${ProdutosApiConnection.baseUrl}/${id}`;
    }
}

export default ProdutosApiConnection;