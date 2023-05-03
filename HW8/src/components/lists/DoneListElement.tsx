import { FC } from "react";
import "./DoneListElement.css";
import { Item } from "../../models/Item";
import { ReactComponent as CheckboxDone} from "./assets/checkboxDone.svg";

interface Props {
    doneItem: Item,
}

export const DoneListElement: FC<Props> = ({doneItem}) => {
    return (
        <li className="taskElement">
            <CheckboxDone className="checkboxImg" />
            <div className="taskDiv">
                <p className="spanDone">{doneItem.title}</p>
                <div className="tag doneTag">{doneItem.tag}</div>
            </div>
        </li>
    )
}