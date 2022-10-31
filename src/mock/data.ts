import { IProduto } from "interfaces/IProduto";
import { ICadastro } from "interfaces/IUser";

import img1 from "assets/images/produtos/img-1.png";
import img2 from "assets/images/produtos/img-2.png";
import img3 from "assets/images/produtos/img-3.png";
import img4 from "assets/images/produtos/img-4.png";
import img5 from "assets/images/produtos/img-5.png";
import img6 from "assets/images/produtos/img-6.png";
import img7 from "assets/images/produtos/img-7.png";
import img8 from "assets/images/produtos/img-8.png";
import img9 from "assets/images/produtos/img-9.png";
import img10 from "assets/images/produtos/img-10.png";
import img11 from "assets/images/produtos/img-11.png";
import img12 from "assets/images/produtos/img-12.png";
import img13 from "assets/images/produtos/img-13.png";
import img14 from "assets/images/produtos/img-14.png";
import img15 from "assets/images/produtos/img-15.png";
import img16 from "assets/images/produtos/img-16.png";
import img17 from "assets/images/produtos/img-17.png";
import img18 from "assets/images/produtos/img-18.png";

const produtos: Array<Omit<IProduto, "id">> = [
    {
        nome: "star_wars_1",
        categoria: "star_wars",
        descricao: "foo",
        preco: "15",
        imgUrl: img1,
    },
    {
        nome: "star_wars_2",
        categoria: "star_wars",
        descricao: "foo",
        preco: "20",
        imgUrl: img2,
    },
    {
        nome: "star_wars_3",
        categoria: "star_wars",
        descricao: "foo",
        preco: "17.50",
        imgUrl: img3,
    },
    {
        nome: "star_wars_4",
        categoria: "star_wars",
        descricao: "foo",
        preco: "14.75",
        imgUrl: img4,
    },
    {
        nome: "star_wars_5",
        categoria: "star_wars",
        descricao: "foo",
        preco: "16",
        imgUrl: img5,
    },
    {
        nome: "star_wars_6",
        categoria: "star_wars",
        descricao: "foo",
        preco: "24",
        imgUrl: img18,
    },

    {
        nome: "console_1",
        categoria: "console",
        descricao: "foo",
        preco: "40",
        imgUrl: img6
    },
    {
        nome: "console_2",
        categoria: "console",
        descricao: "foo",
        preco: "2000",
        imgUrl: img7
    },
    {
        nome: "console_1",
        categoria: "console",
        descricao: "foo",
        preco: "2000",
        imgUrl: img8
    },
    {
        nome: "console_3",
        categoria: "console",
        descricao: "foo",
        preco: "120",
        imgUrl: img9
    },
    {
        nome: "console_4",
        categoria: "console",
        descricao: "foo",
        preco: "2000",
        imgUrl: img10
    },
    {
        nome: "console_5",
        categoria: "console",
        descricao: "foo",
        preco: "290",
        imgUrl: img11
    },


    {
        nome: "outro_1",
        categoria: "outro",
        descricao: "foo",
        preco: "50",
        imgUrl: img12
    },
    {
        nome: "outro_2",
        categoria: "outro",
        descricao: "foo",
        preco: "50",
        imgUrl: img13
    },
    {
        nome: "outro_3",
        categoria: "outro",
        descricao: "foo",
        preco: "50",
        imgUrl: img14
    },
    {
        nome: "outro_4",
        categoria: "outro",
        descricao: "foo",
        preco: "50",
        imgUrl: img15
    },
    {
        nome: "outro_5",
        categoria: "outro",
        descricao: "foo",
        preco: "50",
        imgUrl: img16
    },
    {
        nome: "outro_6",
        categoria: "outro",
        descricao: "foo",
        preco: "50",
        imgUrl: img17
    },
];

const cadastros: Array<ICadastro> = [
    {
        email: "admin@gmail.com",
        senha: "admin"
    }
];

export { produtos, cadastros }