import { FC, useState } from "react";
import "./ListElement.css";
import "../tags.css";
import { Item } from "../../models/Item";
import { TAGS_CLASSES } from "../../models/Tag";
import { ReactComponent as CheckboxTask } from "./assets/checkboxTask.svg";
import { ReactComponent as Bucket } from "./assets/bucket.svg";
import { ReactComponent as Edit } from "./assets/edit.svg";
import { useAppDispatch } from "../../app/hooks";
import { deleteToDo, updateToDo } from "../../features/todo/todoSlice";
import { ItemPopup } from "../ItemPopup";


interface Props {
    item: Item,
}

export const ListElement: FC<Props> = ({ item }) => {
    const [popupVisible, setPopupVisible] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    function handleComplete() {
        dispatch(updateToDo({ ...item, isCompleted: true }));
    }

    function handleDelete() {
        dispatch(deleteToDo(item.id));
    }

    return (
        <li className="taskElement">
            <CheckboxTask className="checkboxImg" onClick={() => handleComplete()} />
            <div className="taskDiv">
                <p className="spanTask">{item.title}</p>
                <div className={`tag ${TAGS_CLASSES[item.tag]}`}>{item.tag}</div>
            </div>
            <button className="iconButton" onClick={() => setPopupVisible(true)}>
                <Edit className="editImage" />
            </button>
            <button className="iconButton" onClick={() => handleDelete()}>
                <Bucket className="deleteImage" />
            </button>
            {popupVisible &&
                <div className="popupOverlay">
                    <ItemPopup headerTitle={`Edit "${item.title}" Task`} buttonTitle="Save" title={item.title} tag={item.tag}
                        onClose={() => setPopupVisible(false)}
                        onSubmit={(title, tag) => dispatch(updateToDo({ ...item, title, tag }))} />
                </div>}
        </li>
    )
}