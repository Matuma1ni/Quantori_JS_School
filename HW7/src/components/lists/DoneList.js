import { DoneListElement } from './DoneListElement.js' 
import './DoneList.css'

export function DoneList({doneItems, searchString}) {
    const ul = document.createElement("ul");
    ul.classList.add("appList")
    for (let doneItem of doneItems) {
        if (searchString) {
            if (doneItem.title.includes(searchString)) {
                ul.append(DoneListElement({doneItem}));
            };
        } else {
            ul.append(DoneListElement({doneItem}));
        }
    }
    return ul;
}