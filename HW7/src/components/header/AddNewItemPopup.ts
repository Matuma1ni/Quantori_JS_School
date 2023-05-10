import { TagForm } from './TagForm';
import { TextInput } from './TextInput';
import { Button } from '../Button';
import { Tag } from '../../models/Tag';
import './AddNewItemPopup.css';

export function AddNewItemPopup({ addItem, closePopup }:
    { addItem: (text: string, tag: Tag) => void, closePopup: () => void }): [HTMLElement, () => void] {

    function changeButtonColor() {
        if (textInput.value !== '') {
            addTaskButton.disabled = false;
        };
        if (textInput.value === '') {
            addTaskButton.disabled = true;
        }
    }

    function handleAddNewItem() {
        const value = textInput.value;
        let tag = "other";
        const radioButtons = Array.from(form.getElementsByTagName("input"));
        for (let button of radioButtons) {
            if (button.checked === true) {
                tag = button.id;
            }
        };
        textInput.value = '';
        addItem(value, tag as Tag);
    }

    function handleClosePopup() {
        textInput.value = '';
        addTaskButton.disabled = true;
        closePopup();
    }

    const divPopup = document.createElement("div");
    divPopup.classList.add("divPopup");
    const popupHeader = document.createElement("h3");
    popupHeader.innerHTML = "Add New Task";
    const divPopupButtons = document.createElement("div");
    divPopupButtons.classList.add("divPopupButtons");

    const textInput = TextInput({ placeholder: "New Task", onInput: changeButtonColor });
    textInput.classList.add("textInput");

    const addTaskButton = Button({ text: "Add", onClick: handleAddNewItem });
    addTaskButton.classList.add("popupSubmitButton");
    addTaskButton.disabled = true;

    const form = TagForm();

    const closePopupButton = Button({ text: "Cancel", onClick: handleClosePopup });
    closePopupButton.classList.add("popupCancelButton");
    divPopupButtons.append(closePopupButton, addTaskButton);
    divPopup.append(popupHeader, textInput, form, divPopupButtons);

    const focus = () => {
        textInput.focus();
    }

    return [divPopup, focus];
}