import { Link } from "react-router-dom";
import classNames from "classnames";

import { AppRoutes } from "routes/RouteHandler";
import { currencyFormat } from "utils/currencyFormat";
import { IProduto } from "interfaces/IProduto";

interface Props
    extends IProduto {
    className?: string;
}

function ProdutoPreview({ imgUrl, nome, preco, id, className }: Props) {
    return (
        <article className={classNames("produto-card", className)}>
            <div className="img-container">
                <img src={imgUrl} alt="" />
            </div>
            <h2 className="produto-card__nome">
                {nome}
            </h2>
            <p className="produto-card__preco">
                {currencyFormat(parseFloat(preco))}
            </p>
            <Link className="link" to={`${AppRoutes.visualizarProduto}/${id}`}>
                Ver produto
            </Link>
        </article>
    );
}

export default ProdutoPreview;