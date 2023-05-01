import { FC } from "react";
import "./DoneList.css";
import { Item } from "../../models/Item";
import { DoneListElement } from "./DoneListElement";

interface Props { 
    items: Item[], 
    searchString: string, 
}

export const DoneList: FC<Props> = ({items, searchString}) => {
    return (
        <ul className="appList">
            {items.map(doneItem => <DoneListElement doneItem={doneItem}/>)}
        </ul>
    )
}