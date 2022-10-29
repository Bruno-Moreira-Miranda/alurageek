import { useState } from "react";
import { useParams } from "react-router-dom";

import { ICategoria } from "interfaces/IProduto";

import useTitle from "hooks/useTitle";
import { useObterSecaoDeProduto } from "hooks/ProdutosService";

import ProdutoList from "components/ProdutoList";
import ProdutoPreview from "components/ProdutoPreview";
import Footer from "layout/Footer";
import Header from "layout/Header";

function VerCategoriaPage() {
    const { categoria: categoriaReq } = useParams();
    useTitle(`Produtos de ${categoriaReq}`);

    const [categoria, setCategoria] = useState<ICategoria>();
    useObterSecaoDeProduto((service: any) => {
        (async () => {
            setCategoria(await service(categoriaReq));
        })();
    }, [categoriaReq]);

    if(!categoria) return null;
    return (
        <>
            <Header />
            <main className="container padding-section-v-1">
                <h1 className="title-1 mb-2">
                    {categoria.name}
                </h1>

                <ProdutoList View={ProdutoPreview} produtos={categoria.produtos} />
            </main>
            <Footer />
        </>
    );
}

export default VerCategoriaPage;