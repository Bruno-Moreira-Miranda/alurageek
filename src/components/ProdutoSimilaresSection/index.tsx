import { HTMLAttributes, useState } from "react";

import { IProduto, IProdutoArr } from "interfaces/IProduto";

import ProdutoList from "components/ProdutoList";
import ProdutoPreview from "components/ProdutoPreview";
import { useObterSecaoDeProduto } from "hooks/ProdutosService";

interface Props
extends HTMLAttributes<HTMLDivElement> {
    produtoTarget: IProduto;
}

function ProdutoSimilaresSection({ produtoTarget, ...rest }: Props) {

    const [produtos, setProdutos] = useState<IProdutoArr>();    

    useObterSecaoDeProduto((service: any) => {
        (async () => {
            const data = await service(produtoTarget.categoria);
            const isNotProdutoTarget = (produto: IProduto) => produto.id !== produtoTarget.id;
            const similares = data.filter(isNotProdutoTarget);
            setProdutos(similares);
        })();
    }, [produtoTarget]);

    return !produtos? null : (
        <aside {...rest}>
            <article>
                <h2 className="title-1 mb-1">
                    Produtos similares
                </h2>
                <ProdutoList  View={ProdutoPreview} produtos={produtos} />
            </article>
        </aside>
    );
}

export default ProdutoSimilaresSection;