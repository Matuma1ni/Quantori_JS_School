import { FC, useMemo } from "react";
import "./Lists.css";
import { Item } from "../../models/Item";
import { List } from "./List";
import { DoneList } from "./DoneList";

interface Props {
    items: Item[],
    searchString: string,
    onDelete: (item: Item) => Promise<void>,
    onComplete: (item: Item) => Promise<void>,
}

export const Lists: FC<Props> = ({items, searchString, onDelete, onComplete}) => {
    const filteredItems = useMemo(() => {
        if (searchString) {
            return items.filter(item => item.title.includes(searchString));
        }
        return items;
    }, [items, searchString]); 
    const todoItems = filteredItems.filter(item => item.isCompleted === false);
    const completedItems = filteredItems.filter(item => item.isCompleted === true);

    return (
        <div className="mainDiv">
            <div className="listsDiv">
                <h3 className="listHeader">All Tasks</h3>
                <List items={todoItems} onCompleteTask={onComplete} onDeleteTask={onDelete}/>
                <h3 className="listHeader">Completed Tasks</h3>
                <DoneList items={completedItems}/>
            </div>
        </div>
    )
}