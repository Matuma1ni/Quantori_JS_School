import { DoneListElement } from './DoneListElement'
import { Item } from '../../models/Item'
import './DoneList.css'

export function DoneList({ doneItems, searchString }: { doneItems: Item[], searchString: string }): HTMLElement {
    const ul = document.createElement("ul");
    ul.classList.add("appList")
    for (let doneItem of doneItems) {
        if (searchString) {
            if (doneItem.title.includes(searchString)) {
                ul.append(DoneListElement({ doneItem }));
            };
        } else {
            ul.append(DoneListElement({ doneItem }));
        }
    }
    return ul;
}