import { FC } from "react";
import "./DoneListElement.css";
import { Item } from "../../models/Item";

const checkboxDone = require("../../static/checkboxTask.svg") as string;

interface Props {
    doneItem: Item,
}

export const DoneListElement: FC<Props> = ({doneItem}) => {
    return (
        <li className="taskElement">
            <img src={checkboxDone} className="checkboxImg"></img>
            <div className="taskDiv">
                <p className="spanDone">{doneItem.title}</p>
                <div className="tag doneTag">{doneItem.tag}</div>
            </div>
        </li>
    )
}