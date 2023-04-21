import { DoneListElement } from './DoneListElement.js' 

export function DoneList({doneItems, searchString}) {
    const ul = document.createElement("ul");
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