const formater = Intl.NumberFormat("BR", { style: "currency", currency: "BRL" });
function currencyFormat(n: number) {
    return formater.format(n);
}

export { currencyFormat };