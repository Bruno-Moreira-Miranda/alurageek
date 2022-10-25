/*=============== CONST ===============*/
const InputPattern = {
    anyCaractere: /[^\s,]{1}/
} as const;
/*=============== CONST - end ===============*/

function matchPattern(input: HTMLInputElement, pattern: RegExp, error: string) {
    
    const matched = pattern.exec(input.value);
    if(matched) {
        input.setCustomValidity("");
    }
    else input.setCustomValidity(error);
    return Boolean(matched);
}

function anyCaractere(input: HTMLInputElement) {
    return matchPattern(input, InputPattern.anyCaractere, "Digite algum caractere");
}

export { InputPattern, matchPattern, anyCaractere};