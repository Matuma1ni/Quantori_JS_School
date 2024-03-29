import './ListElement.css';
import { Button } from '../Button';
import { TAGS_CLASSES } from '../../models/Tag';
import { Item } from '../../models/Item';

const checkboxTask = require("../../static/checkboxTask.svg") as string;

export function ListElement({item, onDeleteTask, onCompleteTask}: 
    {item: Item, onDeleteTask: () => void, onCompleteTask: () => void,}): HTMLElement {
    let li = document.createElement("li");
    li.classList.add("taskElement");
    const deleteImage = document.createElement("span");
    deleteImage.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 2H8C8 1.44772 7.55228 1 7 1C6.44772 1 6 1.44772 6 2ZM5 2C5 0.89543 5.89543 0 7 0C8.10457 0 9 0.89543 9 2H13C13.2761 2 13.5 2.22386 13.5 2.5C13.5 2.77614 13.2761 3 13 3H12.4364L11.2313 11.8378C11.0624 13.0765 10.0044 14 8.75422 14H5.24578C3.99561 14 2.93762 13.0765 2.76871 11.8378L1.56355 3H1C0.723858 3 0.5 2.77614 0.5 2.5C0.5 2.22386 0.723858 2 1 2H5ZM6 5.5C6 5.22386 5.77614 5 5.5 5C5.22386 5 5 5.22386 5 5.5V10.5C5 10.7761 5.22386 11 5.5 11C5.77614 11 6 10.7761 6 10.5V5.5ZM8.5 5C8.77614 5 9 5.22386 9 5.5V10.5C9 10.7761 8.77614 11 8.5 11C8.22386 11 8 10.7761 8 10.5V5.5C8 5.22386 8.22386 5 8.5 5ZM3.75954 11.7027C3.86089 12.4459 4.49568 13 5.24578 13H8.75422C9.50432 13 10.1391 12.4459 10.2405 11.7027L11.4272 3H2.57281L3.75954 11.7027Z"/></svg>'
    deleteImage.classList.add("deleteImage");
    const deleteButton = Button({text: "", onClick: onDeleteTask});
    deleteButton.append(deleteImage);
    deleteButton.classList.add("deleteButton");

    const checkbox = document.createElement("img");
    checkbox.setAttribute("src", checkboxTask);
    checkbox.addEventListener("click", onCompleteTask);
    checkbox.classList.add("checkboxImg");
    let taskDiv = document.createElement("div");
    taskDiv.classList.add("taskDiv");
    let p = document.createElement("p");
    p.innerHTML = item.title;
    p.classList.add('spanTask');
    let tag = document.createElement("div");
    tag.classList.add("tag");
    tag.classList.add(TAGS_CLASSES[item.tag]);
    tag.innerHTML = item.tag;
    taskDiv.append(p, tag);

    li.append(checkbox, taskDiv, deleteButton);
    return li;
}