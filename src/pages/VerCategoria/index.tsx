import { useState } from "react";
import { useParams } from "react-router-dom";

import useTitle from "hooks/useTitle";
import { useObterSecaoDeProduto } from "hooks/ProdutosService";

import ProdutoList from "components/ProdutoList";
import ProdutoPreview from "components/ProdutoPreview";
import Footer from "layout/Footer";
import Header from "layout/Header";

function VerCategoriaPage() {
    const { categoria } = useParams();
    useTitle(`Produtos de ${categoria}`);

    const [produtos, setProdutos] = useState();
    useObterSecaoDeProduto((service: any) => {
        (async () => {
            setProdutos(await service(categoria));
        })();
    }, [categoria]);

    return !produtos ? null : (
        <>
            <Header />
            <main className="container padding-section-v-1">
                <h1 className="title-1 mb-2">
                    {categoria}
                </h1>

                <ProdutoList View={ProdutoPreview} produtos={produtos} />
            </main>
            <Footer />
        </>
    );
}

export default VerCategoriaPage;