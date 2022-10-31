import { HTMLAttributes } from "react";
import classNames from "classnames";

import iconPath from "assets/images/icon.png";
import logoChunk1 from "assets/images/logo/logo-chunk-1.png";
import logoChunk2 from "assets/images/logo/logo-chunk-2.png";

import styles from "./Logo.module.css";

type Props = HTMLAttributes<HTMLDivElement>;

function Logo({ className, ...rest }: Props) {
    return (
        <div 
            className={classNames("img-container", styles.logo, className)}
            {...rest}>
                <img src={iconPath} alt="" />
                <img src={logoChunk1} alt="" />
                <img src={logoChunk2} alt="" />
        </div>
    );
}

export default Logo;