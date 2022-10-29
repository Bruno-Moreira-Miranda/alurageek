import { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import { AppRoutes } from "routes/RouteHandler";
import { ICategoria } from "interfaces/IProduto";

import ProdutoList from "components/ProdutoList";
import ProdutoPreview from "components/ProdutoPreview";
import SetaAzulDireita from "components/assets-components/SetaAzulDireita";

import styles from "./ProdutoCategoriaSection.module.css";

interface Props
    extends Omit<ICategoria, "id"> {
    className?: string;
}

function ProdutoCategoriaSection({ name, produtos, className }: Props) {

    return (
        <section className={className}>
            <div className={classNames(styles.row_1, "row", "row--center-v", "row--split-h")}>
                <h2 className="title-1">
                    {name}
                </h2>
                <div className={styles.link}>
                    <Link className="link" to={`${AppRoutes.verCategoria}/${name}`}>
                        Ver tudo
                    </Link>
                    <SetaAzulDireita className={styles.seta} />
                </div>
            </div>
            <ProdutoList View={ProdutoPreview} produtos={produtos} />
        </section>
    );
}

export default ProdutoCategoriaSection;