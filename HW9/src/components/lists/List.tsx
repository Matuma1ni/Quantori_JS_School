import { FC } from "react";
import "./List.css";
import { Item } from "../../models/Item";
import { ListElement } from "./ListElement";

interface Props { 
    items: Item[], 
}

export const List: FC<Props> = ({items}) => {
    return (
        <ul className="appList">
            {items.map(item => <ListElement key={item.id} item={item} />)}
        </ul>
    )
}