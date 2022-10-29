import { ICadastro } from "interfaces/IUser";

import CadastroApiConnection from "./apis/cadastro-api-connection";
import LogarApiConnection from "./apis/logar-api-connection";
import VerifyApiConnection from "./apis/verify-api-connection";

class UsersCadastroService {
    private cadastro: CadastroApiConnection;
    private log: LogarApiConnection;
    private verify: VerifyApiConnection;

    constructor() {
        this.cadastro = new CadastroApiConnection();
        this.log = new LogarApiConnection();
        this.verify = new VerifyApiConnection();
    }

    async cadastrar(cadastro: ICadastro) {
        const response = await this.cadastro.post(cadastro);

        return response.ok;
    }

    async logar(credenciais: ICadastro) {
        const response = await this.log.post(credenciais);
        const logado = await response.json();

        return logado;
    }

    async emUso(email: ICadastro) {
        const response = await this.verify.post(email);

        const emUso = response.json();

        return emUso;
    }
}

export default UsersCadastroService;