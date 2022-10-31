import { HTMLAttributes, useState } from "react";

import { ICategoria, IProduto, IProdutoArr } from "interfaces/IProduto";

import ProdutoList from "feature/produto/ProdutoList";
import ProdutoPreview from "feature/produto/ProdutoPreview";
import { useObterSecaoDeProduto } from "hooks/ProdutosService";

interface Props
    extends HTMLAttributes<HTMLDivElement> {
    produtoTarget: IProduto;
}

function ProdutoSimilaresSection({ produtoTarget, ...rest }: Props) {

    const [produtos, setProdutos] = useState<IProdutoArr>();

    useObterSecaoDeProduto((service: any) => {
        (async () => {
            const { produtos }: ICategoria = await service(produtoTarget.categoria);
            const isNotProdutoTarget = (produto: IProduto) => produto.id !== produtoTarget.id;
            const similares = produtos.filter(isNotProdutoTarget);
            setProdutos(similares);
        })();
    }, [produtoTarget]);

    if(!produtos) return null;
    return (
        <aside {...rest}>
            <article>
                <h2 className="title-1 mb-1">
                    Produtos similares
                </h2>
                <ProdutoList View={ProdutoPreview} produtos={produtos} />
            </article>
        </aside>
    );
}

export default ProdutoSimilaresSection;