import { useState } from "react";
import { useParams } from "react-router-dom";

import { IProduto } from "interfaces/IProduto";

import useTitle from "hooks/useTitle";
import { useObterProduto } from "hooks/ProdutosService";

import ProdutosService from "services/produtos-service";

import ProdutoForm from "components/ProdutoForm";
import Footer from "layout/Footer";
import Header from "layout/Header";

function EditarProdutoPage() {

    useTitle("Editar-produto");

    const { id } = useParams();

    const [produto, setProduto] = useState<IProduto>();

    useObterProduto((service: any) => {
        (async () => {
            setProduto(await service(id));
        })();
    }, [id]);

    const inputs = produto && {
        imgUrl: {
            value: produto.imgUrl
        },
        categoria: {
            value: produto.categoria
        },
        nome: {
            value: produto.nome
        },
        preco: {
            value: produto.preco
        },
        descricao: {
            value: produto.descricao
        }
    };

    async function submit(produto: IProduto) {
        const service = new ProdutosService();
        const atualizado = await service.atualizarProduto(produto, id as string);
        if (atualizado) {
            alert("atualizado");
        }
    }

    return !produto ? null : (
        <>
            <Header />
            <main className="container padding-section-v-1 produto-form-page-padding">
                <h1 className="title-1 mb-1">Editar produto</h1>
                <ProdutoForm
                    onReadyToSumbit={submit}
                    inputsInit={inputs}
                    buttonText="Salvar" />
            </main>
            <Footer />
        </>
    );
}

export default EditarProdutoPage;