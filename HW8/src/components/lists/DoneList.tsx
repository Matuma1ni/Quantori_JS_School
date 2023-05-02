import { FC } from "react";
import "./DoneList.css";
import { Item } from "../../models/Item";
import { DoneListElement } from "./DoneListElement";

interface Props { 
    items: Item[],  
}

export const DoneList: FC<Props> = ({items}) => {
    return (
        <ul className="appList">
            {items.map(doneItem => <DoneListElement doneItem={doneItem}/>)}
        </ul>
    )
}