// helper function to decode the text before rendering
export function decodeHTML(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

// helper to return Alphabets according to index
export function getOptionLetter(index) {
    return String.fromCharCode(65 + index);
}