import { FC } from "react";
import "./List.css";
import { Item } from "../../models/Item";
import { ListElement } from "./ListElement";

interface Props { 
    items: Item[], 
    onDeleteTask: (item: Item) => void, 
    onCompleteTask: (item: Item) => void
}

export const List: FC<Props> = ({items, onDeleteTask, onCompleteTask}) => {
    return (
        <ul className="appList">
            {items.map(item => <ListElement key={item.id} item={item} onCompleteTask={onCompleteTask} onDeleteTask={onDeleteTask} />)}
        </ul>
    )
}