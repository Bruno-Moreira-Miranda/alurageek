import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";

import useTitle from "hooks/useTitle";
import { useLogin } from "context/logged";

import { AppRoutes } from "routes/RouteHandler";
import UsersCadastroService from "services/users-cadastro-service";

import Button from "components/Button";
import { TextInput } from "components/Inputs-style";
import Footer from "layout/Footer";
import Header from "layout/Header";

import styles from "./Login.module.css";

interface FormInputs {
    email: HTMLInputElement;
    senha: HTMLInputElement;
}

function LoginPage() {

    useTitle("Login");

    const navegador = useNavigate();

    const log = useLogin();

    const emailRef = useRef<HTMLInputElement>();
    const senhaRef = useRef<HTMLInputElement>();

    async function onSubmitHandler(event: React.FormEvent) {
        event.preventDefault();
        event.stopPropagation();

        const form = event.target as HTMLFormElement;
        const inputs: FormInputs = {
            email: emailRef.current as HTMLInputElement,
            senha: senhaRef.current as HTMLInputElement
        };

        const isValidity = form.reportValidity();

        if (!isValidity) return;

        const service = new UsersCadastroService();
        const credencias = {
            email: inputs.email.value,
            senha: inputs.senha.value
        };
        const logado = await service.logar(credencias);

        if (logado) {
            log(true);
            navegador(AppRoutes.administracao, { replace: true });
        }
        else alert("entradas inválidas");
    }

    return (
        <>
            <Header />
            <main className="user-form-page-padding form-page-padding-v column">
                <h1 className="title-1 mb-1 column--center-self">Iniciar Sessão</h1>
                <form className="column gap-rw-1" noValidate onSubmit={onSubmitHandler}>
                    <TextInput
                        ref={emailRef}
                        className="text-input--padding-v-g"
                        name="email"
                        type="email"
                        id="login-email"
                        placeholder="Escreva seu email" />
                    <TextInput
                        ref={senhaRef}
                        className="text-input--padding-v-g"
                        name="password"
                        type="password"
                        id="login-password"
                        placeholder="Escreva sua senha" />

                    <Button className="button--padding-1" type="submit">
                        Entrar
                    </Button>
                </form>

                <Link
                    className={classNames(styles.cadastroButton, "button button--transparente", "button--padding-1")}
                    to={AppRoutes.singup}>
                    Fazer cadastro
                </Link>

            </main>
            <Footer />
        </>
    );
}

export default LoginPage;