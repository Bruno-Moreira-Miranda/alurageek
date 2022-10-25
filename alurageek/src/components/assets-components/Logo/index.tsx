import { HTMLAttributes } from "react";

import path from "assets/images/logo.png";
import classNames from "classnames";

type Props = HTMLAttributes<HTMLDivElement>;

function Logo({ className, ...rest }: Props) {
    return (
        <div 
            className={classNames("img-container", className)}
            {...rest}>
            <img src={path} alt="Logo" />
        </div>
    );
}

export default Logo;