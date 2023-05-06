import { FC, useRef } from 'react';
import './AddNewItemPopup.css';
import { TAGS_CLASSES, Tag } from '../../models/Tag';
import { useAppDispatch } from '../../app/hooks';
import { addToDo } from '../../features/todo/todoSlice';


interface Props {
    onClose: () => void,
}

const tags: Tag[] = [Tag.Health, Tag.Work, Tag.Home, Tag.Other];

export const AddNewItemPopup: FC<Props> = ({ onClose }) => {
    const dispatch = useAppDispatch();
    const inputRef = useRef<HTMLInputElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    function handleInput() {
        if (buttonRef.current) {
            buttonRef.current.disabled = !inputRef.current?.value;
        }
    }

    function handleAddItem() {
        if (formRef.current) {
            dispatch(addToDo({title: formRef.current.task.value, tag: formRef.current.tag.value}));
            onClose();
        }
    }

    return (
        <form ref={formRef} className="divPopup" onSubmit={handleAddItem}>
            <h3>Add New Task</h3>
            <input ref={inputRef}
                type="text"
                name="task"
                className="textInput"
                placeholder="New Task"
                onInput={handleInput}>
            </input>
            <div className="form">
                {tags.map(t => <span key={t}>
                    <input
                        id={t}
                        value={t}
                        type="radio"
                        name="tag"
                        defaultChecked={t === Tag.Other} />
                    <label
                        className={`tag ${TAGS_CLASSES[t]}`}
                        htmlFor={t}>{t}</label>
                </span>)}
            </div>
            <div className="divPopupButtons">
                <button className="popupCancelButton" onClick={onClose}>Cancel</button>
                <button ref={buttonRef} type="submit" className="popupSubmitButton" disabled={true}>Add</button>
            </div>
        </form>
    )
}