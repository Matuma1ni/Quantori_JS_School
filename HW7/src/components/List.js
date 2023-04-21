import { ListElement } from './ListElement.js' 

export function List({items, searchString, onDeleteTask, onCompleteTask}) {
    const ul = document.createElement("ul");
    for (let item of items) {
        if (searchString) {
            if (item.title.includes(searchString)) {
                ul.append(ListElement({item,
                    onDeleteTask: () => onDeleteTask(item.id),
                    onCompleteTask: () => onCompleteTask(item.id)
                    }))
            }
        } else {
        ul.append(ListElement({item,
                               onDeleteTask: () => onDeleteTask(item.id),
                               onCompleteTask: () => onCompleteTask(item.id)
                               }));
        }
    }
    return ul;
}