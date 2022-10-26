interface IProduto {
    imgUrl: string
    nome: string
    preco: string
    categoria: string
    descricao: string
    id: string
}

type IProdutoArr = Array<IProduto>; 

export type { IProduto, IProdutoArr }