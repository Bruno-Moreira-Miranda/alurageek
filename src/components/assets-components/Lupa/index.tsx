import { HTMLAttributes } from "react";
import classNames from "classnames";

import { ReactComponent as Svg } from "assets/images/icon/lupa.svg";

type Props = HTMLAttributes<HTMLDivElement>;

function Lupa({ className, ...rest }: Props) {
    return (
        <div className={classNames("svg-container", className)} {...rest}>
            <Svg />
        </div>
    );
}

export default Lupa;