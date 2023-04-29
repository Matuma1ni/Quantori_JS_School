import { FC } from "react";
import { Item } from "../../models/Item";
import { Tag } from "../../models/Tag";
import { WeatherWidget } from "./WeatherWidget";
import "./Header.css";

interface Props {
    items: Item[],
    onAddItem: (text: string, tag: Tag) => Promise<void>,
    onSearch: (searchString: string) => void,
}

export const Header: FC<Props> = ({ items, onAddItem, onSearch }) => {
    return (
        <div className="divHeader">
            <div>
                <h1 className="appHeader">To Do List</h1>
                <WeatherWidget/>
            </div>
        </div>
    );
};