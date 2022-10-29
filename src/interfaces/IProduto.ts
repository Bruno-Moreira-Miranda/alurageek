interface IProduto {
    imgUrl: string
    nome: string
    preco: string
    categoria: string
    descricao: string
    id: string
}

type IProdutoArr = Array<IProduto>; 

interface ICategoria {
    name: string
    produtos: IProdutoArr
    id: string
}

type ICategoriaArr = Array<ICategoria>

export type { IProduto, IProdutoArr, ICategoria, ICategoriaArr }