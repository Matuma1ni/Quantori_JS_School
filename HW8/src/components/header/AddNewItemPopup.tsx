import { FC, useState } from 'react';
import './AddNewItemPopup.css';
import { Tag } from '../../models/Tag';
import { TagForm } from './TagForm';


interface Props {
    onClose: () => void,
    onAddItem: (text: string, tag: Tag) => Promise<void>,
}


export const AddNewItemPopup: FC<Props> = ({onAddItem, onClose}) => {
    const [task, setTask] = useState("");
    const [tag, setTag] = useState(Tag.Other);

    function handleAddItem() {
        void onAddItem(task, tag);
        onClose();
    }
    return (
        <div className="divPopup">
            <h3>Add New Task</h3>
            <input type="text"
                className="textInput"
                placeholder="New Task"
                value={task}
                onInput={(event: React.ChangeEvent<HTMLInputElement>) => setTask(event.target.value)}>
            </input>
            <TagForm tag={tag} onChange={setTag}/>
            <div className="divPopupButtons">
                <button className="popupCancelButton" onClick={onClose}>Cancel</button>
                <button className="popupSubmitButton" disabled={!task} onClick={handleAddItem}>Add</button>

            </div>

        </div>
    )
}