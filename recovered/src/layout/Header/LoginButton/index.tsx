import { HTMLAttributes } from "react";
import classNames from "classnames";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { AppRoutes } from "routes/RouteHandler";

import Button from "components/Button";

import styles from "./LoginButton.module.css";

type Props = HTMLAttributes<HTMLAnchorElement>;

function LoginButton({ className, ...rest }: Props) {
    return (
        <Link 
            className={classNames(styles.loginButton, "button", "button--transparente", "button--padding-1", className)}
            to={AppRoutes.login}
            title="Fazer login"
            {...rest}>
            Login
        </Link>
    );
}

export default LoginButton;