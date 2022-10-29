import { IProduto } from "interfaces/IProduto";
import { ICadastro } from "interfaces/IUser";

const produtos: Array<Omit<IProduto, "id">> = [
    {
        nome: "star",
        categoria: "star_wars",
        descricao: "foo",
        preco: "9",
        imgUrl: "http://localhost:3000/alurageek/home",
    },
    {
        nome: "star",
        categoria: "star_wars",
        descricao: "foo",
        preco: "9",
        imgUrl: "http://localhost:3000/alurageek/home",
    },
    {
        nome: "star",
        categoria: "star_wars",
        descricao: "foo",
        preco: "9",
        imgUrl: "http://localhost:3000/alurageek/home",
    },
    {
        nome: "star",
        categoria: "star_wars",
        descricao: "foo",
        preco: "9",
        imgUrl: "http://localhost:3000/alurageek/home",
    },
    {
        nome: "star",
        categoria: "star_wars",
        descricao: "foo",
        preco: "9",
        imgUrl: "http://localhost:3000/alurageek/home",
    },
];

const cadastros: Array<ICadastro> = [
    {
        email: "admin@gmail.com",
        senha: "admin"
    }
];

export { produtos, cadastros }