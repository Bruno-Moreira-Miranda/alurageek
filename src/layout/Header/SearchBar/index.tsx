import React, { HTMLAttributes, useRef } from "react";
import classNames from "classnames";

import Lupa from "components/assets-components/Lupa";

import { anyCaractere } from "utils/inputValidity";

import { useNavigate } from "react-router-dom";
import { AppRoutes } from "routes/RouteHandler";

import styles from "./SearchBar.module.css";

type Props = Pick<HTMLAttributes<HTMLFormElement>, keyof HTMLAttributes<HTMLDivElement>> ;

const inputNames = {
    search: "header-search-bar-input"
};

function $SearchBar({ className, ...rest }: Props, ref: any) {

    const navegador = useNavigate();

    const searchInputDefaultRef = useRef<HTMLInputElement>(null);
    const searchInputRef: React.RefObject<HTMLInputElement> = ref || searchInputDefaultRef;

    function search(event: React.FormEvent) {
        event.preventDefault();
        event.stopPropagation();

        const form = event.target as HTMLFormElement;
        const searchInput = searchInputRef.current as HTMLInputElement;

        validity(searchInput);
        const isValidy = form.reportValidity();

        if(!isValidy) return;

        const query = searchInput.value.trim();

        navegador(`${AppRoutes.resultados}/${query}`);
    }

    function validity(input: HTMLInputElement) {
        anyCaractere(input);
    }

    //placeholder vazio para fins de estilição
    return (
        <form
            className={classNames(styles.searchBar, "row row--center-v", className)}
            noValidate
            onSubmit={search}
            autoComplete="off"
            {...rest}>
            <div className={styles.searchInputContainer}>
                <input className={styles.searchInput__input}
                    ref={searchInputRef}
                    placeholder=" "
                    id={inputNames.search}
                    required />
                <label
                    className={styles.searchInput__placeholder}
                    htmlFor={inputNames.search}>
                    O que deseja encontrar?
                </label>
            </div>
            <button type="submit" title="Busca produto">
                <Lupa />
            </button>
        </form>
    );
}

const SearchBar = React.forwardRef($SearchBar);

export default SearchBar;