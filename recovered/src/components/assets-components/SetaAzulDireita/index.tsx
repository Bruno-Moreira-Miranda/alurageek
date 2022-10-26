import { HTMLAttributes } from "react";
import classNames from "classnames";

import { ReactComponent as Svg } from "assets/images/seta-azul-direita.svg";

type Props = HTMLAttributes<HTMLDivElement>;

function SetaAzulDireita({ className, ...rest }: Props) {
    return (
        <div className={classNames("svg-container", className)} {...rest}>
            <Svg />
        </div>
    );
}

export default SetaAzulDireita;