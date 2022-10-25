import { IUserCadastro } from "interfaces/IUsersCadastro";

class UsersCadastroApiConnection {
    static baseUrl = "https://my-json-server.typicode.com/Bruno-Moreira-Miranda/db/cadastros";

    async get(query?: string) {
        const requestInit: RequestInit = {
            method: "GET",
            mode: "cors",
            headers: {
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        };

        const endPoint = query ? this.itemEndPoint(query) : UsersCadastroApiConnection.baseUrl;

        const response = await fetch(endPoint, requestInit);

        return response;
    }

    async post(cadastro: IUserCadastro) {

        const requestInit: RequestInit = {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(cadastro),
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        };

        const response = await fetch(UsersCadastroApiConnection.baseUrl, requestInit);

        return response;
    }

    async patch(atts: Partial<IUserCadastro>, id: string) {
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
        return `${UsersCadastroApiConnection.baseUrl}/${id}`;
    }
}

export default UsersCadastroApiConnection;