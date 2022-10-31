import { useState } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames";

import useTitle from "hooks/useTitle";
import { useObterProduto } from "hooks/ProdutosService";

import { IProduto } from "interfaces/IProduto";
import { currencyFormat } from "utils/currencyFormat";

import ProdutoSimilaresSection from "feature/produto/ProdutoSimilaresSection";
import Footer from "layout/Footer";
import Header from "layout/Header";

import styles from "./VizualizarProduto.module.css";

function VizualizarProdutoPage() {
    
    const { id } = useParams();
    
    const [produto, setProduto] = useState<IProduto>();

    useTitle(produto?.nome ?? "Ver produto");

    useObterProduto((service: any) => {
        (async () => {
            setProduto(await service(id));
        })();
    }, [id]);

    if(!produto) return null;
    return (
        <>
            <Header />
            <main className={styles.first}>
                <article className={classNames(styles.produtoVizualizacao, "column", "gap-rw-1", "mb-2")}>
                    <div className={classNames(styles.produtoVizualizacao__img, "img-container")}>
                        <img src={produto.imgUrl} alt="" />
                    </div>
                    <div className="container column gap-rw-05">
                        <h2 className={styles.produtoVizualizacao__nome}>
                            {produto.nome}
                        </h2>
                        <p className="produto-card__preco">
                            {currencyFormat(parseFloat(produto.preco))}
                        </p>
                        <p className={classNames(styles.produtoVizualizacao__descricao, "produto-card__descricao")}>
                            {produto.descricao}
                        </p>
                    </div>
                </article>
            </main>
            <ProdutoSimilaresSection
                className={classNames(styles.last, "container")}
                produtoTarget={produto} />
            <Footer />
        </>
    );
}

export default VizualizarProdutoPage;