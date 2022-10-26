import useTitle from "hooks/useTitle";
import ProdutosService from "services/produtos-service";

import { IProduto } from "interfaces/IProduto";
import Footer from "layout/Footer";

import Header from "layout/Header";

import ProdutoForm from "components/ProdutoForm";

function AdicionarProdutoPage() {

    useTitle("Adicionar-produto");

    async function submit(produto: IProduto, form: HTMLFormElement) {
        const service = new ProdutosService();
        const criado = await service.novoProduto(produto);

        if(criado) {
            alert("Produto criado");
            form.reset();
        }
    }

    return (
        <>
            <Header />
            <main className="container padding-section-v-1 produto-form-page-padding">
                <h1 className="title-1 mb-1">Adicionar produto</h1>
                <ProdutoForm onReadyToSumbit={submit} buttonText="Adicionar" />
            </main>
            <Footer />
        </>
    );
}

export default AdicionarProdutoPage;