import useTitle from "hooks/useTitle";

import ProdutoCategoriaSection from "components/ProdutoCategoriaSection";
import Banner from "layout/Banner";
import Footer from "layout/Footer";
import Header from "layout/Header";

function HomePage() {
    useTitle("Home");

    return (
        <>
            <Header />
            <Banner />
            <main className="container padding-section-v-1 column section-gap-1">
                <ProdutoCategoriaSection categoria="star wars" />
                <ProdutoCategoriaSection categoria="console" />
                <ProdutoCategoriaSection categoria="outros" />
            </main>
            <Footer />
        </>
    );
}

export default HomePage;