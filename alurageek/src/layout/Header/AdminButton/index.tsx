import { Link } from "react-router-dom";
import classNames from "classnames";

import { AppRoutes } from "routes/RouteHandler";

import {  HTMLAttributes } from "react";

type Props = Omit<HTMLAttributes<HTMLAnchorElement>, "title">;

function AdminButton({ className, ...rest }: Props) {
    return (
        <Link
            className={classNames("button--padding-1 button--transparente", className)}
            to={AppRoutes.administracao}
            title={"Ir para o menu de administração"}
            {...rest}>
            Menu de Administrador
        </Link>
    );
}

export default AdminButton;