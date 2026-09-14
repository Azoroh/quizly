import { useEffect } from "react";

export function useLocalStorage(KEY, value) {
    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(value))
    }, [KEY, value])
}