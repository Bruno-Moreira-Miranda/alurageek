import classNames from "classnames";

import { IProdutoArr } from "interfaces/IProduto";

import styles from "./ProdutoList.module.css";

interface Props {
    produtos: IProdutoArr;
    View: React.FC<any>;
    className?: string;
}

function ProdutoList({ produtos, View, className }: Props) {
    return (
        <ul className={classNames(styles.produtoList, className)}>
            {produtos.map(produto => {
                return (
                    <li key={produto.id}>
                        <View {...produto} />
                    </li>
                );
            })}
        </ul>
    );
}

export default ProdutoList;