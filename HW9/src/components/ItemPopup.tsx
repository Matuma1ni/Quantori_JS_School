import { FC, useRef } from 'react';
import './ItemPopup.css';
import './tags.css';
import { TAGS_CLASSES, Tag, tags } from '../models/Tag';
import { useAppDispatch } from '../app/hooks';


interface Props {
    headerTitle: string, 
    buttonTitle: string,
    title?: string,
    tag?: Tag,
    onClose: () => void,
    onSubmit: (title: string, tag: Tag) => void,
}

export const ItemPopup: FC<Props> = ({ headerTitle, buttonTitle, title, tag, onClose, onSubmit }) => {
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
            onSubmit(formRef.current.task.value, formRef.current.tag.value);
            onClose();
        }
    }

    return (
        <form ref={formRef} className="divPopup" onSubmit={handleAddItem}>
            <h3>{headerTitle}</h3>
            <input ref={inputRef}
                type="text"
                name="task"
                className="textInput"
                defaultValue={title}
                placeholder="New Task"
                onInput={handleInput}>
            </input>
            <div className="form">
                {tags.map(t => <span key={`${t}-task-form`}>
                    <input
                        id={`${t}-task-form`}
                        value={t}
                        type="radio"
                        name="tag"
                        defaultChecked={t === (tag ?? Tag.Other)} />
                    <label
                        className={`tag ${TAGS_CLASSES[t]}`}
                        htmlFor={`${t}-task-form`}>{t}</label>
                </span>)}
            </div>
            <div className="divPopupButtons">
                <button className="popupCancelButton" onClick={onClose}>Cancel</button>
                <button ref={buttonRef} type="submit" className="popupSubmitButton" disabled={!title}>{buttonTitle}</button>
            </div>
        </form>
    )
}