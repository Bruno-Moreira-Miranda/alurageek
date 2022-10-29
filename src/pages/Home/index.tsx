import { useState } from "react";

import { ICategoriaArr } from "interfaces/IProduto";

import useTitle from "hooks/useTitle";
import { useObterSecaoDeProduto } from "hooks/ProdutosService";

import ProdutoCategoriaSection from "components/ProdutoCategoriaSection";

import Banner from "layout/Banner";
import Footer from "layout/Footer";
import Header from "layout/Header";

function HomePage() {
    useTitle("Home");

    const [categorias, setCategorias] = useState<ICategoriaArr>();

    useObterSecaoDeProduto((service: any) => {
        (async () => {
            const data = await service();
            setCategorias(data);
        })();
    }, []);

    if (!categorias) return null;
    return (
        <>
            <Header />
            <Banner />
            <main className="container padding-section-v-1 column section-gap-1">
                {
                    categorias.map(({ name, produtos, id }) => (
                        <ProdutoCategoriaSection key={id} name={name} produtos={produtos} />
                    ))
                }
            </main>
            <Footer />
        </>
    );
}

export default HomePage;