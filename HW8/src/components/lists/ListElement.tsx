import { FC } from "react";
import "./ListElement.css";
import { Item } from "../../models/Item";
import { TAGS_CLASSES } from "../../models/Tag";
import {ReactComponent as CheckboxTask} from "./assets/checkboxTask.svg";
import {ReactComponent as Bucket} from "./assets/bucket.svg";


interface Props {
    item: Item,
    onCompleteTask: (item: Item) => void,
    onDeleteTask: (item: Item) => void,
}

export const ListElement: FC<Props> = ({ item, onDeleteTask, onCompleteTask }) => {
    return (
        <li className="taskElement">
            <CheckboxTask className="checkboxImg" onClick={() => onCompleteTask(item)}/>
            <div className="taskDiv">
                <p className="spanTask">{item.title}</p>
                <div className={`tag ${TAGS_CLASSES[item.tag]}`}>{item.tag}</div>
            </div>
            <button className="deleteButton" onClick={() => onDeleteTask(item)}>
                <Bucket className="deleteImage" />
            </button>
        </li>
    )
}