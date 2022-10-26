import { HTMLAttributes, useEffect, useRef } from "react";

import { IProduto } from "interfaces/IProduto";

import { anyCaractere } from "utils/inputValidity";

import ProdutosService from "services/produtos-service";

import Button from "components/Button";
import { Textarea, TextInput } from "components/Inputs-style";

const inputNames = {
    url: "adicionar-produto-url",
    categoria: "adicionar-produto-categoria",
    nome: "adicionar-produto-nome",
    preco: "adicionar-produto-preco",
    descricao: "adicionar-produto-descricao"
};

interface Props
    extends HTMLAttributes<HTMLDivElement> {
    onReadyToSumbit: (inputs: IProduto, form: HTMLFormElement) => unknown;
    inputsInit?: {
        imgUrl?: {
            value: string;
        },
        categoria?: {
            value: string
        },
        nome?: {
            value: string
        },
        preco?: {
            value: string
        },
        descricao?: {
            value: string
        }
    }
    buttonText?: string
}

interface FormInputs {
    imgUrl: HTMLInputElement;
    categoria: HTMLInputElement;
    nome: HTMLInputElement;
    preco: HTMLInputElement;
    descricao: HTMLInputElement;
}

function ProdutoForm({ onReadyToSumbit, inputsInit, buttonText }: Props) {
    const imgUrlRef = useRef<HTMLInputElement>();
    const categoriaRef = useRef<HTMLInputElement>();
    const nomeRef = useRef<HTMLInputElement>();
    const precoRef = useRef<HTMLInputElement>();
    const descricaoRef = useRef<HTMLInputElement>();

    async function submitHandler(event: React.FormEvent) {
        event.preventDefault();
        event.stopPropagation();

        const form = event.target as HTMLFormElement;

        const inputs: FormInputs = {
            imgUrl: imgUrlRef.current as HTMLInputElement,
            categoria: categoriaRef.current as HTMLInputElement,
            nome: nomeRef.current as HTMLInputElement,
            preco: precoRef.current as HTMLInputElement,
            descricao: descricaoRef.current as HTMLInputElement
        };

        const isValidy = (await validity(inputs), form.reportValidity());

        if (!isValidy) return;

        // cria um objeto usando as chaves de "inputs", porém com valor sendo o "value" dos inputs
        const dados = Object.entries(inputs)
            .reduce((dados, [name, input]: any[]) => {
                const value = { value: input.value, enumerable: true };
                Object.defineProperty(dados, name, value);
                return dados;
            }, {});

        onReadyToSumbit(dados as IProduto, form);
    }

    async function validity(inputs: FormInputs) {
        const { nome, categoria, descricao, imgUrl, preco } = inputs;

        const service = new ProdutosService();
        const searchObj = { nome: nome.value };
        const resultado = await service.jaExisteProp(searchObj);

        // Aplicar os erros baseado no booleano de "resultado". True = erro.
        Object.entries(resultado)
            .forEach(([nome, existe]) => {
                const input = inputs[nome as never] as HTMLInputElement;
                if (!input) throw new Error("não foi possivel identificar o input durante a fase de validação");

                if (!existe) {
                    input.setCustomValidity("");
                    return; //"break" o loop
                }
                input.setCustomValidity("Este nome já existe");
            });

        anyCaractere(categoria);
        anyCaractere(descricao);
    }

    useEffect(() => {
        if (inputsInit) {
            const { imgUrl, categoria, nome, preco, descricao } = inputsInit;

            imgUrl?.value && (imgUrlRef.current!.value = imgUrl.value);
            categoria?.value && (categoriaRef.current!.value = categoria.value);
            nome?.value && (nomeRef.current!.value = nome.value);
            preco?.value && (precoRef.current!.value = preco.value);
            descricao?.value && (descricaoRef.current!.value = descricao.value);
        }
    }, []);

    return (
        <form className="column gap-rw-1"
            noValidate
            onSubmit={submitHandler}
            autoComplete="off">
            <TextInput
                ref={imgUrlRef}
                type="url"
                id={inputNames.url}
                labelText="URL da imagem"
                required />
            <TextInput
                ref={categoriaRef}
                id={inputNames.categoria}
                labelText="Categoria"
                required />
            <TextInput
                ref={nomeRef}
                id={inputNames.nome}
                labelText="Nome do produto"
                required />
            <TextInput
                ref={precoRef}
                type="number"
                id={inputNames.preco}
                step={0.01}
                min={0}
                labelText="Preço do produto"
                required />
            <Textarea
                ref={descricaoRef}
                id={inputNames.descricao}
                labelText="Descrição do produto"
                required />

            <Button className="button--padding-1">
                {buttonText ?? "Submit"}
            </Button>
        </form>
    );
}

export default ProdutoForm;