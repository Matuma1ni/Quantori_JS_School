import './DoneListElement.css'
import checkboxDone from "../../static/checkboxDone.svg"

export function DoneListElement({doneItem}) {
    let li = document.createElement("li");
    li.classList.add("taskElement");

    const checkboxSVG = document.createElement("img");
    checkboxSVG.setAttribute("src", checkboxDone);
    checkboxSVG.classList.add("checkboxImg");

    let taskDiv = document.createElement("div");
    taskDiv.classList.add("taskDiv");
    let p = document.createElement("p");
    p.innerHTML = doneItem.title;
    p.classList.add('spanDone');
    let tag = document.createElement("div");
    tag.classList.add("tag");
    tag.classList.add("doneTag");
    tag.innerHTML = doneItem.tag;
    taskDiv.append(p, tag);

    li.append(checkboxSVG, taskDiv);
    return li;
}
