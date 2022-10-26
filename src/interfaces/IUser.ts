interface ICadastro {
    email: string,
    senha: string
}

interface IUser {
    cadastro: ICadastro 
}

export type { IUser, ICadastro }