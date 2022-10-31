import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";

import useTitle from "hooks/useTitle";
import { useObterTodosProdutos } from "hooks/ProdutosService";

import { IProduto, IProdutoArr } from "interfaces/IProduto";

import { AppRoutes } from "routes/RouteHandler";
import ProdutosService from "services/produtos-service";

import ProdutoList from "feature/produto/ProdutoList";
import Footer from "layout/Footer";
import Header from "layout/Header";
import ProdutoAdminMode from "feature/produto/ProdutoAdminMode";

import styles from "./Administracao.module.css";

function AdministracaoPage() {

    useTitle("Administração");

    const navegador = useNavigate();

    const [currentProdutos, setCurrentProdutos] = useState<IProdutoArr>();

    useObterTodosProdutos((service: any) => {
        (async () => {
            setCurrentProdutos(await service());
        })();
    }, []);

    async function deletar(id: string) {
        const service = new ProdutosService();
        const deletado = await service.removerProduto(id);
        if (deletado) {
            setCurrentProdutos(produtos => (
                produtos!.filter(produto => produto.id !== id)
            ));
        }
    }

    function editar(id: string) {
        navegador(`${AppRoutes.editarProduto}/${id}`);
    }

    const ProdutoAdmin = (produto: IProduto) => {
        return (
            <ProdutoAdminMode
                deletar={() => deletar(produto.id)}
                editar={() => editar(produto.id)}
                {...produto} />
        );
    };

    if(!currentProdutos) return null;
    return (
        <>
            <Header />
            <main className={classNames(styles.administracao, "container", "padding-section-v-1")}>
                <h1 className="title-1">
                    Todos os produtos
                </h1>
                <Link to={AppRoutes.adicionarProduto} className="button button--default button--padding-1">
                    Adicionar produto
                </Link>

                <ProdutoList View={ProdutoAdmin} produtos={currentProdutos} />
            </main>
            <Footer />
        </>
    );
}

export default AdministracaoPage;