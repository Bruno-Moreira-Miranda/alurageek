import { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import { useObterSecaoDeProduto } from "hooks/ProdutosService";

import { AppRoutes } from "routes/RouteHandler";
import { IProdutoArr } from "interfaces/IProduto";

import ProdutoList from "components/ProdutoList";
import ProdutoPreview from "components/ProdutoPreview";
import SetaAzulDireita from "components/assets-components/SetaAzulDireita";

import styles from "./ProdutoCategoriaSection.module.css";

interface Props {
    className?: string;
    categoria: string;
}

function ProdutoCategoriaSection({ categoria, className }: Props) {

    const [produtos, setProdutos] = useState<IProdutoArr>();

    useObterSecaoDeProduto((service: any) => {
        (async () => {
            setProdutos(await service(categoria));
        })();
    }, [categoria]);

    return !produtos? null: (
        <section className={className}>
            <div className={classNames(styles.row_1, "row", "row--center-v", "row--split-h")}>
                <h2 className="title-1">
                    {categoria}
                </h2>
                <div className={styles.link}>
                    <Link className="link" to={`${AppRoutes.verCategoria}/${categoria}`}>
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