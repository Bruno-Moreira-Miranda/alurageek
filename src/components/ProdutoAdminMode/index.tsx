import classNames from "classnames";

import { IProduto } from "interfaces/IProduto";
import { currencyFormat } from "utils/currencyFormat";

import Lixo from "components/assets-components/Lixo";
import Lapis from "components/assets-components/Lapis";


interface Props
    extends IProduto {
    className?: string
    deletar: any;
    editar: any;
}

function ProdutoAdminMode({ imgUrl, nome, preco, id, deletar, editar, className }: Props) {
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
            <p className="produto-card__code">
                {`#${id}`}
            </p>
            <div className="produto-card__acoes">
                <Lixo onClick={deletar} />
                <Lapis onClick={editar} />
            </div>
        </article>
    );
}

export default ProdutoAdminMode;