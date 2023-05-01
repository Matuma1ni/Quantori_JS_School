import { FC, useState } from "react";
import { Item } from "../../models/Item";
import { Tag } from "../../models/Tag";
import { WeatherWidget } from "./WeatherWidget";
import "./Header.css";
import { AddNewItemPopup } from "./AddNewItemPopup";

interface Props {
    items: Item[],
    searchString: string,
    onAddItem: (text: string, tag: Tag) => Promise<void>,
    onSearch: (searchString: string) => void,
}

export const Header: FC<Props> = ({ items, searchString, onAddItem, onSearch }) => {
    const [popupVisible, setPopupVisible] = useState<boolean>(false)

    return (
        <div className="divHeader">
            <div>
                <h1 className="appHeader">To Do List</h1>
                <WeatherWidget />
            </div>
            <input type="text"
                className="searchInput"
                placeholder="Search Task"
                value={searchString}
                onInput={(event: React.ChangeEvent<HTMLInputElement>) => onSearch(event.target.value)}>
            </input>
            <button className="buttonNewTask" onClick={() => setPopupVisible(true)}>+ New Task</button>
            {popupVisible && <div className="popupOverlay"><AddNewItemPopup onAddItem={onAddItem} onClose={() => setPopupVisible(false)}/></div>}
        </div>
    );
};