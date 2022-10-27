import { ICadastro } from "interfaces/IUser";

class VerifyApiConnection {
    static baseUrl = "http://localhost:8080/verify"

    async post(credenciais: ICadastro["email"]) {
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

        const response = await fetch(VerifyApiConnection.baseUrl, RequestInit);

        return response;
    }
}

export default VerifyApiConnection;