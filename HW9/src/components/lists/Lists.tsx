import { FC, useMemo } from "react";
import "./Lists.css";
import { Item } from "../../models/Item";
import { List } from "./List";
import { DoneList } from "./DoneList";
import { useAppSelector } from "../../app/hooks";
import { selectSearchString, selectToDos } from "../../features/todo/todoSlice";

export const Lists: FC = () => {
    const items = useAppSelector(selectToDos);
    const searchString = useAppSelector(selectSearchString);
    
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
                <List items={todoItems}/>
                <h3 className="listHeader">Completed Tasks</h3>
                <DoneList items={completedItems}/>
            </div>
        </div>
    )
}