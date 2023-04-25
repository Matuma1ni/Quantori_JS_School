import './TagForm.css';
import { Tag, TAGS_CLASSES } from '../../models/Tag';

export function TagForm() {
    const form = document.createElement("form");
    form.classList.add("form");
    const tags: Tag[] = [Tag.Health, Tag.Work, Tag.Home, Tag.Other];

    for (let tag of tags) {
        const input: HTMLInputElement = document.createElement("input");
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