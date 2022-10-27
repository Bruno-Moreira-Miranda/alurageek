import { IProduto } from "interfaces/IProduto";
import { ICadastro } from "interfaces/IUser";

const produtos: Array<Omit<IProduto, "id">> = [
    {
        nome: "star",
        categoria: "star_wars",
        descricao: "foo",
        preco: "9",
        imgUrl: "a",
    },
    {
        nome: "star",
        categoria: "star_wars",
        descricao: "foo",
        preco: "9",
        imgUrl: "a",
    },
    {
        nome: "star",
        categoria: "star_wars",
        descricao: "foo",
        preco: "9",
        imgUrl: "a",
    },
    {
        nome: "star",
        categoria: "star_wars",
        descricao: "foo",
        preco: "9",
        imgUrl: "a",
    },
    {
        nome: "star",
        categoria: "star_wars",
        descricao: "foo",
        preco: "9",
        imgUrl: "a",
    },
];

const cadastros: Array<ICadastro> = [
    {
        email: "admin@gmail.com",
        senha: "admin"
    }
];

export { produtos, cadastros }