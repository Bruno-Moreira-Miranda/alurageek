import React, { ButtonHTMLAttributes } from "react";
import classNames from "classnames";

type Estilos = "default" | "transparente";

interface Props
extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    estilo?: Estilos;
    children?: any;
}

const Button = React.forwardRef((props: Props, ref: any) => (
    <button
        ref={ref}
        className={classNames("button", `button--${props.estilo ?? "default"}`, props.className)}>
        {props.children}
    </button>
));
Button.displayName = "Button";

export default Button;