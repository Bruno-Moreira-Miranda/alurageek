import React, { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import classNames from "classnames";

interface Props
    extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    labelText?: string;
    id: string;
    placeholder?: string;
}

function $TextInput(props: Props, ref: any) {

    const { labelText, placeholder, className, id, type, ...rest } = props;

    // placeholder vazio para fins de estilização
    return (
        <div className={classNames("text-input", className)}>
            {
                labelText &&
                <label className="text-input__label" htmlFor={id}>
                    {labelText}
                </label>
            }
            <div className="text-input__input-container">
                <input
                    ref={ref}
                    id={id}
                    type={type ?? "text"}
                    placeholder=" "
                    className="text-input__input"
                    {...rest} />
                {
                    placeholder &&
                    <label
                        htmlFor={id}
                        className="text-input__placeholder">
                        {placeholder}
                    </label>
                }
            </div>
        </div>
    );
}

interface PropsTextarea
    extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    id: string;
    labelText: string;
    className?: string;
}

function $Textarea(props: PropsTextarea, ref: any) {
    const { labelText, className, id, ...rest } = props;

    return (
        <div className={classNames("text-input", "text-input--textarea", className)}>
            <label className="text-input__label" htmlFor={id}>
                {labelText}
            </label>
            <textarea
                ref={ref}
                id={id}
                className="text-input__input"
                {...rest}
            />
        </div>
    );
}

const TextInput = React.forwardRef($TextInput);
const Textarea = React.forwardRef($Textarea);

export { TextInput, Textarea };