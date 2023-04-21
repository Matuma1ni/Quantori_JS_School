import { List } from './components/List.js';
import { DoneList } from './components/DoneList.js';
import { apiClient } from './clients/apiClient.js';
import { WeatherWidget } from './components/WeatherWidget.js';
import { SearchInput } from './components/SearchInput.js';
import { Button } from './components/Button.js';
import { useSearchString } from 'useSearchString.js';
import { useState } from './useState.js';

(function () {
    let state = undefined;
    let searchString = undefined;
    const URL = "http://api.weatherapi.com/v1/current.json"
    const API_KEY = "f8c3dc5311f44fd8a98141433231804";
    TAGS_CLASSES = {
        "health": "healthTag",
        "home": "homeTag",
        "work": "workTag",
        "other": "otherTag",
    };


    /**
     * App container
     * @returns {HTMLDivElement} - The app container
     */
    async function AppHeader() {

        const [_, setItems] = useState(await apiClient.getTodos());
        const [searchString, setSearchString] = useSearchString('');

        function changeSearchString() {
            setSearchString(searchInput.value);
        }

        function addNewTask() {
            popupOverlay.style.display = "block";
            popupInputFocus();
        }

        async function addItem(text, tag) {
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

    async function App() {
        const [items, setItems] = useState(await apiClient.getTodos());
        const todoItems = items.filter(item => item.isCompleted === false);
        const completedItems = items.filter(item => item.isCompleted === true);
        const [searchString, setSearchString] = useSearchString('');

        async function deleteTask(id) {
            await apiClient.deleteTodo(id);
            const newItems = await apiClient.getTodos();
            setItems(newItems);
        }

        async function completeTask(id) {
            const item = items.filter(item => item.id === id)[0];
            item.isCompleted = true;
            await apiClient.updateTodo(id, item);
            const newItems = await apiClient.getTodos();
            setItems(newItems);
        }

        const div = document.createElement("div");
        div.classList.add("mainDiv");
        const listsDiv = document.createElement("div");
        listsDiv.classList.add("listsDiv");
        const list = List({items: todoItems, onDeleteTask: deleteTask, onCompleteTask: completeTask, searchString});
        const doneList = DoneList({doneItems: completedItems, searchString});

        const taskHeader = document.createElement("h3");
        taskHeader.innerHTML = "All Tasks";
        const doneHeader = document.createElement("h3");
        doneHeader.innerHTML = "Completed Tasks";
        listsDiv.append(taskHeader, list, doneHeader, doneList,);
        
        div.append(listsDiv,);
        return div;
    }

    /**
     * Render the app.
     * On change whole app is re-rendered.
     */
    async function renderHeader(){
        const appContainer = document.getElementById("functional-header");
        appContainer.innerHTML = "";
        appContainer.append(await AppHeader());
    }
    async function renderApp() {
        const appContainer = document.getElementById("functional-example");
        appContainer.innerHTML = "";
        appContainer.append(await App());
    }

    // initial render
    renderHeader();
    renderApp();
})();