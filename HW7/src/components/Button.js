export function Button({text, onClick}) {
    const button = document.createElement("button");
    button.innerHTML = text;
    button.onclick = onClick;
    return button;
}