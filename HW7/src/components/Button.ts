export function Button({text, onClick}:{text: string, onClick: ()=>void}) :HTMLButtonElement {
    const button = document.createElement("button");
    button.innerHTML = text;
    button.onclick = onClick;
    return button;
}