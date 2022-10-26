import { useState } from "react";
import { useParams } from "react-router-dom";

import useTitle from "hooks/useTitle";

import { useBuscarProdutos } from "hooks/ProdutosService";

import ProdutoList from "components/ProdutoList";
import ProdutoPreview from "components/ProdutoPreview";
import Footer from "layout/Footer";
import Header from "layout/Header";

function ResultadosPage() {
    useTitle("Resultados");

    const { query } = useParams();
    const [produtos, setProdutos] = useState();

    useBuscarProdutos((service: any) => {
        (async () => {
            setProdutos(await service(`?nome_like=^${query}`));
        })();
    }, [query]);

    return !produtos ? null : (
        <>
            <Header />
            <main className="container padding-section-v-1">
                <h1 className="title-1 mb-2">
                    {`Resultados de "${query}"`}
                </h1>
                <section>
                    <ProdutoList View={ProdutoPreview} produtos={produtos} />
                </section>
            </main>
            <Footer />
        </>
    );
}

export default ResultadosPage;