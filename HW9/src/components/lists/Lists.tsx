import { FC, useMemo } from "react";
import "./Lists.css";
import { List } from "./List";
import { DoneList } from "./DoneList";
import { useAppSelector } from "../../app/hooks";
import { selectToDos } from "../../features/todo/todoSlice";
import { useSearchParams } from "react-router-dom";
import { Tag } from "../../models/Tag";
import { Item } from "../../models/Item";

export const Lists: FC = () => {
    const items = useAppSelector(selectToDos);
    const [searchParams] = useSearchParams();
    const selectedTag = searchParams.get("tag") as Tag;
    const searchString = searchParams.get("searchString");
    
    const filteredItems = useMemo(() => {
        let resultItems: Item[] = items;
        if (searchString) {
            resultItems = resultItems.filter(item => item.title.includes(searchString));
        }
        if (selectedTag) {
            resultItems = resultItems.filter(item => item.tag === selectedTag);
        }
        return resultItems;
    }, [items, searchParams]); 
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