import { useEffect } from "react";

export function useKey(KEY, action, answer) {
    useEffect(() => {
        function callback(e) {
            if (e.key.toLowerCase() === KEY.toLowerCase() && answer) action()

            console.log(KEY, ' pressed')
        }

        document.addEventListener('keydown', callback)

        return () => {
            document.removeEventListener('keydown', callback)
        }
    }, [KEY, action, answer])
}