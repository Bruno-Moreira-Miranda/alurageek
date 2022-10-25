import { HTMLAttributes } from "react";

import Button from "components/Button";
import classNames from "classnames";

import styles from "./Banner.module.css";

type Props = HTMLAttributes<HTMLDivElement>;

function Banner({ className, ...rest }: Props) {
    return (
        <aside
            className={classNames(styles.banner, "container", "padding-section-v-1", className)}
            role="banner"
            {...rest}>
            <h2>Dezembro Promocional</h2>
            <p>Produtos selecionados com 33% de desconto</p>
            <Button className="button--padding-1">
                Ver Consoles
            </Button>
        </aside>
    );
}

export default Banner;