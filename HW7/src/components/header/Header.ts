import { useState } from '../../renders';
import { useSearchString } from '../../renders';
import { apiClient } from '../../clients/apiClient';
import { SearchInput } from './SearchInput';
import { Button } from '../Button'
import { WeatherWidget } from './WeatherWidget';
import { AddNewItemPopup } from './AddNewItemPopup';
import './Header.css';
import { Tag } from '../../models/Tag';

export async function AppHeader() {

    const [_, setItems] = useState(await apiClient.getTodos());
    const [searchString, setSearchString] = useSearchString('');

    function changeSearchString() {
        setSearchString(searchInput.value);
    }

    function addNewTask() {
        popupOverlay.style.display = "block";
        popupInputFocus();
    }

    async function addItem(text: string, tag: Tag) {
        await apiClient.addTodo(text, tag);
        const newItems = await apiClient.getTodos();
        setItems(newItems);
        closePopup();
    }

    function closePopup() {
        popupOverlay.style.display = "none";
    }

    const div = document.createElement("div");
    div.classList.add("divHeader");
    const divHeader = document.createElement("div");
    const newTaskButton = Button({text: "+ New Task", onClick: addNewTask});
    newTaskButton.classList.add("buttonNewTask");
    const searchInput = SearchInput({searchString: searchString, placeholder: "Search Task", changeSearchString: changeSearchString});
    searchInput.classList.add("searchInput");
    const header = document.createElement("h1");
    header.classList.add("appHeader");
    header.innerHTML = "To Do List";
    const weatherWidget = await WeatherWidget();
    const [popup, popupInputFocus] = AddNewItemPopup({addItem: addItem, 
                                                    closePopup: closePopup});

    const popupOverlay = document.createElement("div");
    popupOverlay.classList.add("popupOverlay");
    popupOverlay.append(popup);
    popupOverlay.style.display = "none"; 
    divHeader.append(header, weatherWidget);   
    div.append(divHeader, searchInput, newTaskButton, popupOverlay);

    return div;
}