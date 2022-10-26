import { HTMLAttributes } from "react";
import classNames from "classnames";

import { ReactComponent as Svg} from "assets/images/lixo.svg";

type Props = HTMLAttributes<HTMLDivElement>;

function Lixo({ className, ...rest }: Props) {
    return (
        <div className={classNames("svg-container", className)} {...rest}>
            <Svg />
        </div>
    );
}

export default Lixo;