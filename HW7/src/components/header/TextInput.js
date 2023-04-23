export function TextInput({placeholder, onInput }) {
    const textInput = document.createElement("INPUT");
    textInput.setAttribute("type", "text");
    textInput.placeholder = placeholder;
    textInput.oninput = onInput;
    return textInput;
}