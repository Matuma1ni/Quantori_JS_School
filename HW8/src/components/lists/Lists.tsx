import { FC } from "react";
import "./Lists.css";
import { Item } from "../../models/Item";
import { List } from "./List";
import { DoneList } from "./DoneList";

interface Props {
    items: Item[],
    searchString: string,
    onDelete: (id: number) => Promise<void>,
    onComplete: (id: number) => Promise<void>,
}

export const Lists: FC<Props> = ({items, searchString, onDelete, onComplete}) => {
    const todoItems = items.filter(item => item.isCompleted === false);
    const completedItems = items.filter(item => item.isCompleted === true);
    
    return (
        <div className="mainDiv">
            <div className="listsDiv">
                <h3 className="listHeader">All Tasks</h3>
                <List />
                <h3 className="listHeader">Completed Tasks</h3>
                <DoneList />
            </div>
        </div>
    )
}