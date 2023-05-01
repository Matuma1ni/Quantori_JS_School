import { FC } from "react";
import "./List.css";
import { Item } from "../../models/Item";
import { ListElement } from "./ListElement";

interface Props { 
    items: Item[], 
    searchString: string, 
    onDeleteTask: (id: number) => void, 
    onCompleteTask: (id: number) => void
}

export const List: FC<Props> = ({items, searchString, onDeleteTask, onCompleteTask}) => {
    return (
        <ul className="appList">
            {items.map(item => <ListElement item={item} onCompleteTask={onCompleteTask} onDeleteTask={onDeleteTask} />)}
        </ul>
    )
}