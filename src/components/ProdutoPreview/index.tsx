import { Link } from "react-router-dom";
import classNames from "classnames";

import { AppRoutes } from "routes/RouteHandler";
import { currencyFormat } from "utils/currencyFormat";

interface Props {
    imgPath: string;
    nome: string;
    preco: string;
    id: string;
    className?: string;
}

function ProdutoPreview({ imgPath, nome, preco, id, className }: Props) {
    return (
        <article className={classNames("produto-card", className)}>
            <div className="img-container">
                <img src={imgPath} alt="" />
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