import { ListElement } from './ListElement'
import { Item } from '../../models/Item'
import './List.css'

interface Properties { 
    items: Item[], 
    searchString: string, 
    onDeleteTask: (id: number) => void, 
    onCompleteTask: (id: number) => void
}
export function List({ items, searchString, onDeleteTask, onCompleteTask }: Properties): HTMLElement {
    const ul = document.createElement("ul");
    ul.classList.add("appList")
    for (let item of items) {
        if (searchString) {
            if (item.title.includes(searchString)) {
                ul.append(ListElement({
                    item,
                    onDeleteTask: () => onDeleteTask(item.id),
                    onCompleteTask: () => onCompleteTask(item.id)
                }))
            }
        } else {
            ul.append(ListElement({
                item,
                onDeleteTask: () => onDeleteTask(item.id),
                onCompleteTask: () => onCompleteTask(item.id)
            }));
        }
    }
    return ul;
}