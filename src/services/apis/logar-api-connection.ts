import { ICadastro } from "interfaces/IUser";

class LogarApiConnection {
    static baseUrl = "http://localhost:8080/login"; 

    async post(credenciais: ICadastro) {
        const RequestInit: RequestInit = {
            method: "POST",
            body: JSON.stringify(credenciais),
            headers: {
                "Content-Type": "application/json",
                "Content-Charset": "utf-8"
            },
            mode: "cors",
            cache: "no-cache"
        }

       const response = await fetch(LogarApiConnection.baseUrl, RequestInit);

       return response;
    }
}

export default LogarApiConnection;