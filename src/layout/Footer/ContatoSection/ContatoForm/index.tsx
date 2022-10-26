import { HTMLAttributes } from "react";

import { Textarea, TextInput } from "components/Inputs-style";
import Button from "components/Button";

import styles from "./ContatoForm.module.css";

type Props = HTMLAttributes<HTMLDivElement>;

function ContatoForm({ className, ...rest }: Props) {
    return (
        <article className={className} {...rest}>
            <form className={styles.contatoForm}>
                <h2>Fale conosco</h2>
                <TextInput id="ContatoForm-nome" labelText="Nome" />
                <Textarea id="ContatoForm-mensagem" labelText="Escreva seu mensagem" />
                <Button className="button--padding-1">
                    Enviar mensagem
                </Button>
            </form>
        </article>
    );
}

export default ContatoForm;