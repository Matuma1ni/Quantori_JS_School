import { FC } from "react";
import "./DoneListElement.css";
import { Item } from "../../models/Item";
import { ReactComponent as CheckboxDone } from "./assets/checkboxDone.svg";
import { useAppDispatch } from "../../app/hooks";
import { updateToDo } from "../../features/todo/todoSlice";

interface Props {
    doneItem: Item,
}

export const DoneListElement: FC<Props> = ({ doneItem }) => {
    const dispatch = useAppDispatch();

    function handleUncomplete() {
        dispatch(updateToDo({ ...doneItem, isCompleted: false }));
    }
    return (
        <li className="taskElement">
            <CheckboxDone className="checkboxImg" onClick={() => handleUncomplete()} />
            <div className="taskDiv">
                <p className="spanDone">{doneItem.title}</p>
                <div className="tag doneTag">{doneItem.tag}</div>
            </div>
        </li>
    )
}