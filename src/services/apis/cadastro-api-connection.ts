import { ICadastro } from "interfaces/IUser";

class CadastroApiConnection {
    static baseUrl = "http://localhost:8080/singin";

    async post(cadastro: ICadastro) {

        const requestInit: RequestInit = {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(cadastro),
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        };

        const response = await fetch(CadastroApiConnection.baseUrl, requestInit);

        return response;
    }

    private itemEndPoint(id: string) {
        return `${CadastroApiConnection.baseUrl}/${id}`;
    }
}

export default CadastroApiConnection;