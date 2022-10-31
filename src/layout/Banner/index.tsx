import { HTMLAttributes } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import styles from "./Banner.module.css";
import { AppRoutes } from "routes/RouteHandler";

type Props = HTMLAttributes<HTMLDivElement>;

function Banner({ className, ...rest }: Props) {
    return (
        <aside
            className={classNames(styles.banner, "container", "padding-section-v-1", className)}
            role="banner"
            {...rest}>
            <h2>Dezembro Promocional</h2>
            <p>Produtos selecionados com 33% de desconto</p>
            <Link to={`${AppRoutes.verCategoria}/console`} className="button button--default button--padding-1">
                Ver Consoles
            </Link>
        </aside>
    );
}

export default Banner;