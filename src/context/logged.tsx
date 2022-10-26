import React, { SetStateAction, useContext, useState } from "react";

const Context = React.createContext<LoggedContextValue | null>(null);

interface LoggedContextValue {
    logged: boolean
    setLogged: React.Dispatch<SetStateAction<boolean>>;
}

function LoggedProvider({ children }: {children: JSX.Element}) {
    const [logged, setLogged] = useState(false);

    const value: LoggedContextValue = {
        logged,
        setLogged
    };

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}

function useIsLogged() {
    return _useLoggedContext()!.logged;
}

function useLogin() {
    return _useLoggedContext()!.setLogged;
}

function _useLoggedContext() {
    return useContext(Context);
}

export { LoggedProvider, useLogin, useIsLogged };