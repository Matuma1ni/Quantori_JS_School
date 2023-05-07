import { FC, useState } from "react";
import { WeatherWidget } from "./WeatherWidget";
import "./Header.css";
import '../tags.css';
import { AddNewItemPopup } from "./AddNewItemPopup";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { TAGS_CLASSES, Tag, tags } from "../../models/Tag";
import { useSearchParams } from "react-router-dom";

export const Header: FC = () => {
    const [popupVisible, setPopupVisible] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedTag = searchParams.get("tag") as Tag;
    const searchString = searchParams.get("searchString") ?? "";

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
                onInput={(event: React.ChangeEvent<HTMLInputElement>) => setSearchParams(searchParams => {
                    if (event.target.value) {
                        searchParams.set("searchString", event.target.value);
                    } else {
                        searchParams.delete("searchString");
                    }
                    return searchParams;
                })}>
            </input>
            <button className="buttonNewTask" onClick={() => setPopupVisible(true)}>+ New Task</button>
            <div className="tagFilterForm">
                <span>Filter by Tag:</span>
                <form className="tagList">
                    {tags.map(t => <span key={t}>
                        <input
                            id={t}
                            value={t}
                            type="radio"
                            name="tag"
                            checked={t === selectedTag}
                            onChange={() => setSearchParams(searchParams => {
                                searchParams.set("tag", t);
                                return searchParams;
                            })} />
                        <label
                            className={`tag ${TAGS_CLASSES[t]}`}
                            htmlFor={t}>{t}</label>
                    </span>)}
                    <input
                        id="noTag"
                        value="noTag"
                        type="radio"
                        name="tag"
                        checked={!selectedTag}
                        onChange={() =>
                            setSearchParams(searchParams => {
                                searchParams.delete("tag");
                                return searchParams;
                            })
                        } />
                    <label className="tag noTag" htmlFor="noTag">no tag</label>
                </form>
            </div>
            {popupVisible && <div className="popupOverlay"><AddNewItemPopup onClose={() => setPopupVisible(false)} /></div>}
        </div>
    );
};