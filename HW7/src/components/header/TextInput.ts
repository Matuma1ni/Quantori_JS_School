export function TextInput({placeholder, onInput }: {placeholder:string, onInput: () => void}) {
    const textInput: HTMLInputElement  = document.createElement("input");
    textInput.setAttribute("type", "text");
    textInput.placeholder = placeholder;
    textInput.oninput = onInput;
    return textInput;
}