import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

import useTitle from "hooks/useTitle";

import { AppRoutes } from "routes/RouteHandler";
import UsersCadastroService from "services/users-cadastro-service";

import { TextInput } from "components/Inputs-style";
import Button from "components/Button";
import Footer from "layout/Footer";
import Header from "layout/Header";

import styles from "./Singup.module.css";

interface FormInputs {
    email: HTMLInputElement;
    senha: HTMLInputElement;
    confirmarSenha: HTMLInputElement;
}

function SingupPage() {
    useTitle("Cadastrar");

    const navegador = useNavigate();

    const emailRef = useRef<HTMLInputElement>();
    const senhaRef = useRef<HTMLInputElement>();
    const confirmarSenhaRef = useRef<HTMLInputElement>();

    async function submitHandler(event: React.FormEvent) {
        event.preventDefault();
        event.stopPropagation();

        const form = event.target as HTMLFormElement;

        const inputs: FormInputs = {
            email: emailRef.current as HTMLInputElement,
            senha: senhaRef.current as HTMLInputElement,
            confirmarSenha: confirmarSenhaRef.current as HTMLInputElement
        };

        await validity(inputs);
        const isValidy = form.reportValidity();

        if(!isValidy) return;

        const service = new UsersCadastroService();
        const cadastro = {
            email: inputs.email.value,
            senha: inputs.senha.value
        };
        const cadastrado = await service.cadastrar(cadastro);

        if(cadastrado) onSubmitComplete();
    }

    function onSubmitComplete() {
        navegador(AppRoutes.login, { replace: true });
    }

    async function validity(inputs: FormInputs) {
        const { email, senha, confirmarSenha } = inputs;

        const service = new UsersCadastroService();
        const usado = await service.emUso(email.value);
        const diferente = senha.value !== confirmarSenha.value;

        if (usado) { email.setCustomValidity("O email já está em uso"); }
        else  email.setCustomValidity(""); 

        if (diferente) { confirmarSenha.setCustomValidity("As senhas devem ser iguais"); }
        else senha.setCustomValidity("");
    }

    return (
        <>
            <Header />
            <main className={classNames(styles.singup, "user-form-page-padding", "form-page-padding-v", "column")}>
                <h1 className="title-1 mb-2 column--center-self">Cadastro</h1>
                <form
                    onSubmit={submitHandler}
                    className="column"
                    noValidate>
                    <TextInput
                        ref={emailRef}
                        type="text"
                        labelText="Email"
                        id="singup-email"
                        required />
                    <TextInput
                        ref={senhaRef}
                        type="password"
                        labelText="Senha"
                        id="singup-senha"
                        required />
                    <TextInput
                        ref={confirmarSenhaRef}
                        type="password"
                        labelText="Confirmar senha"
                        id="singup-confirmar-senha"
                        required />

                    <Button className="button--padding-1" type="submit">
                        Cadastrar
                    </Button>
                </form>
            </main>
            <Footer />
        </>
    );
}

export default SingupPage;