import classNames from "classnames";

import Logo from "components/assets-components/Logo";
import ContatoForm from "./ContatoForm";
import FAQ from "./FAQ";

import styles from "./ContatoSection.module.css";

function ContatoSection() {
    return (
        <section className={classNames(styles.contatoSection, "container", "padding-section-v-1")}>
            <Logo />
            <FAQ />
            <ContatoForm />
        </section>
    );
}

export default ContatoSection;