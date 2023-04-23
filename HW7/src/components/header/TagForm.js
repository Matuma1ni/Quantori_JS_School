import './TagForm.css';
const TAGS_CLASSES = {
    "health": "healthTag",
    "home": "homeTag",
    "work": "workTag",
    "other": "otherTag",
};

export function TagForm() {
    const form = document.createElement("form");
    form.classList.add("form");
    const tags = ["health", "work", "home", "other"];

    for (let tag of tags) {
        const input = document.createElement("INPUT");
        input.type = "radio"; 
        input.setAttribute("value", tag);
        input.setAttribute("name", "tag");
        input.setAttribute( "id", tag);
        if (tag === "other") {
            input.checked = true;
        }

        const label = document.createElement("label");
        label.innerText = tag;
        label.setAttribute("for", tag);
        label.classList.add("tag");
        label.classList.add(TAGS_CLASSES[tag]);

        form.append(input, label)
    }

    return form; 
}