import { useEffect } from "react";

function hookfyService(service: any) {

    const proto = Object.getPrototypeOf(service);
    const props = Object.getOwnPropertyNames(proto)
        .filter(name => name !== "constructor");
    const entry = props.map(name => [name, service[name]]);

    const isAsyncFunc = (p: any) => p.constructor.name === "AsyncFunction";
    const asyncFuncOnlyEntry = entry.filter(([, func]) => isAsyncFunc(func)); 

    const prefixedFuncsEntry = asyncFuncOnlyEntry.map(([name, func]) => {
        const camelName = name.replace(/^./, name.charAt(0).toUpperCase());
        return [`use${camelName}`, func];
    });

    const hooksEntry = prefixedFuncsEntry.map(([name, func]) => {
        function useHook(f: (service: any) => any, deps: unknown[]) {
            useEffect(() => f(func.bind(service)), deps);
        }
        return [name, useHook];
    });

    const hooksObj = Object.fromEntries(hooksEntry);

    return hooksObj;
}

export default hookfyService;