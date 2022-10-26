import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

function FAQ({ className, ...rest }: Props) {
    return (
        <article className={className} {...rest}>
            <nav>
                <ul className="flex-list flex-list--column gap-1 text-center">
                    <li>Quem somos nós</li>
                    <li>Política de privacidade</li>
                    <li>Programa fidelidade</li>
                    <li>Nossas lojas</li>
                    <li>Quero ser franqueado</li>
                    <li>Anuncie aqui</li>
                </ul>
            </nav>
        </article >
    );
}

export default FAQ;