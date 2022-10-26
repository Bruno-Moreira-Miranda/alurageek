import { ICadastro } from "interfaces/IUser";
import UsersCadastroApiConnection from "./apis/users-cadastro-api-connection";

class UsersCadastroService {
    private connection: UsersCadastroApiConnection;

    constructor() {
        this.connection = new UsersCadastroApiConnection();
    }

    async cadastrar(cadastro: ICadastro) {
        const response = await this.connection.post(cadastro);

        return response.ok;
    }

    async logar({ email, senha }: ICadastro) {
        const response = await this.connection.get(`?$email=${email}&senha=${senha}`);
        const data = await response.json();
        const valido = Boolean(data[0]);

        return valido;
    }

    async emUso(email: string) {
        const response = await this.connection.get(`?email=${email}`);
        const data = await response.json();
        const emUso = Boolean(data.length);

        return emUso;
    }
}

export default UsersCadastroService;