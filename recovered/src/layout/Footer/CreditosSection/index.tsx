import { HTMLAttributes } from "react";
import classNames from "classnames";

import styles from "./CreditoSection.module.css";

type Props = HTMLAttributes<HTMLDivElement>;

function CreditosSection({ className, ...rest }: Props) {
    return (
        <section 
            className={classNames(styles.creditoSection, "container", "padding-section-v-1", className)}
            {...rest}>
            <p className="text-center">
                Desenvolvido por Bruno Moreira Miranda<br/>2022
            </p>
        </section>
    );
}

export default CreditosSection;