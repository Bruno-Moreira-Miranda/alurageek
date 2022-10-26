import { useEffect } from "react";

function useTitle(title: string) {
    useEffect(() => {
        document.title = `AluraGeek | ${title}`;
    });
}

export default useTitle;