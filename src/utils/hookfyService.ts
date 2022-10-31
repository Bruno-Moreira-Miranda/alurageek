import  React, { useEffect } from "react";

function hookfyService(service: any) {

    const proto = Object.getPrototypeOf(service);
    const propsKey = Object.getOwnPropertyNames(proto)
        .filter(name => name !== "constructor");
    const entry = propsKey.map(name => [name, service[name]]);

    const prefixedFuncsEntry = entry.map(([name, func]) => {
        const camelName = name.replace(/^./, name.charAt(0).toUpperCase());
        return [`use${camelName}`, func];
    });

    const hooksEntry = prefixedFuncsEntry.map(([name, func]) => {
        function useHook(f: (service: any) => any, deps: unknown[]) {
            React.useEffect(() => f(func.bind(service)), deps);
        }
        return [name, useHook];
    });

    const hooksObj = Object.fromEntries(hooksEntry);

    return hooksObj;
}

export default hookfyService;