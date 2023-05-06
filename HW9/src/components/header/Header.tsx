import { FC, useState } from "react";
import { WeatherWidget } from "./WeatherWidget";
import "./Header.css";
import { AddNewItemPopup } from "./AddNewItemPopup";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { search, selectSearchString } from "../../features/todo/todoSlice";


export const Header: FC = () => {
    const [popupVisible, setPopupVisible] = useState<boolean>(false);
    const searchString = useAppSelector(selectSearchString);
    const dispatch = useAppDispatch();

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
                onInput={(event: React.ChangeEvent<HTMLInputElement>) => dispatch(search(event.target.value))}>
            </input>
            <button className="buttonNewTask" onClick={() => setPopupVisible(true)}>+ New Task</button>
            {popupVisible && <div className="popupOverlay"><AddNewItemPopup onClose={() => setPopupVisible(false)}/></div>}
        </div>
    );
};