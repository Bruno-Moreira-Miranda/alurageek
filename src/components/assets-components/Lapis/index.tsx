import { HTMLAttributes } from "react";
import classNames from "classnames";

import { ReactComponent as Svg } from "assets/images/icon/lapis.svg";

type Props = HTMLAttributes<HTMLDivElement>;

function Lapis({ className, ...rest }: Props) {
    return (
        <div className={classNames("svg-container", className)} {...rest}>
            <Svg />
        </div>
    );
}

export default Lapis;