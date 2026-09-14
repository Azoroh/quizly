export function formatTime(seconds, short = false) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    if (short) {
        if (secs === 0) return String(mins);
        return `${mins} : ${String(secs).padStart(2, "0")}`;
    }

    return `${String(mins).padStart(2, "0")} : ${String(secs).padStart(2, "0")}`;
}

// export function formatTime(seconds) {
//     const mins = String(Math.floor(seconds / 60)).padStart(2, '0')
//     const secs = String(seconds % 60).padStart(2, '0')

//     return `${mins} : ${secs}`
// }