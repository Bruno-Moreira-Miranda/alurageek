import { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";

import { MdCancel } from "react-icons/md";
import { HiSearch } from "react-icons/hi";

import { useIsLogged } from "context/logged";

import { AppRoutes } from "routes/RouteHandler";

import Logo from "components/Logo";
import LoginButton from "./LoginButton";
import SearchBar from "./SearchBar";
import AdminButton from "./AdminButton";

import styles from "./Header.module.css";

function Header() {
    const location = useLocation();

    const [searchMode, setSearchMode] = useState(false);

    const headerRef = useRef<HTMLElement>(null);
    const searchBarRef = useRef<HTMLInputElement>(null);

    const logged = useIsLogged();
    const isInHome = location.pathname === AppRoutes.home;

    useEffect(() => {
        searchBarRef.current?.focus();
    }, [searchMode]);

    useEffect(() => {
        searchMode 
            ? headerRef.current?.classList.add(styles.mobileSearchBarMode)
            : headerRef.current?.classList.remove(styles.mobileSearchBarMode);
    }, [searchMode]);

    function needed(event: React.MouseEvent) {
        if (isInHome) { event.preventDefault(); }
    }

    return (
        <header
            ref={headerRef}
            className={
                classNames(
                    styles.header,
                    "container",
                    "row row--center-v",
                    "row--split-h",
                )
            }>
            <Link
                to={AppRoutes.home}
                onClick={needed}
                title={isInHome ? "" : "Voltar para a home"}>
                <Logo className={styles.logo} />
            </Link>
            <button
                className={classNames(styles.searchBarToggle, "mobile-only")}
                title="searchBar"
                type="button"
                onClick={() => setSearchMode(bool => !bool)}>
                {
                    searchMode
                        ? <MdCancel />
                        : <HiSearch />
                }
            </button>
            <div className={classNames(styles.searchBarContainer)}>
                <SearchBar ref={searchBarRef} />
            </div>
            {logged ? <AdminButton /> : <LoginButton />}
        </header>
    );
}

export default Header;