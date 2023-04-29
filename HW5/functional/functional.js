(function () {
    let state = undefined;
    let doneState = undefined;
    let searchString = undefined;

    /**
     * Global application state
     * @template T
     * @param {T} initialValue
     * @returns {[T, function(T): void]}
     */
    function useState(initialValue) {
        state = state || initialValue;

        function setValue(newValue) {
            state = newValue;
            renderApp();
        }

        return [state, setValue];
    }

    function useDoneState(initialValue) {
        doneState = doneState || initialValue;

        function setValue(newValue) {
            doneState = newValue;
            renderApp();
        }

        return [doneState, setValue];
    }

    function useSearchString(initialValue) {
        searchString = searchString || initialValue;

        function setValue(newValue) {
            searchString = newValue;
            renderApp();
        }
        return [searchString, setValue];
    }

    /**
     * Functional component for the list
     * @param items {string[]}
     * @returns {HTMLElement} - List element
     */
    function List({items, searchString, onDeleteTask, onCompleteTask}) {
        const ul = document.createElement("ul");
        for (let i=0; i<items.length; i++) {
            if (searchString) {
                if (items[i].includes(searchString)) {
                    ul.append(ListElement({item: items[i],
                        onDeleteTask: () => onDeleteTask(i),
                        onCompleteTask: () => onCompleteTask(i)
                        }))
                }
            } else {
            ul.append(ListElement({item: items[i],
                                   onDeleteTask: () => onDeleteTask(i),
                                   onCompleteTask: () => onCompleteTask(i)
                                   }));
            }
        }
        return ul;
    }

    function ListElement({item, onDeleteTask, onCompleteTask}) {
        let li = document.createElement("li");
        const deleteImage = document.createElement("span");
        deleteImage.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 2H8C8 1.44772 7.55228 1 7 1C6.44772 1 6 1.44772 6 2ZM5 2C5 0.89543 5.89543 0 7 0C8.10457 0 9 0.89543 9 2H13C13.2761 2 13.5 2.22386 13.5 2.5C13.5 2.77614 13.2761 3 13 3H12.4364L11.2313 11.8378C11.0624 13.0765 10.0044 14 8.75422 14H5.24578C3.99561 14 2.93762 13.0765 2.76871 11.8378L1.56355 3H1C0.723858 3 0.5 2.77614 0.5 2.5C0.5 2.22386 0.723858 2 1 2H5ZM6 5.5C6 5.22386 5.77614 5 5.5 5C5.22386 5 5 5.22386 5 5.5V10.5C5 10.7761 5.22386 11 5.5 11C5.77614 11 6 10.7761 6 10.5V5.5ZM8.5 5C8.77614 5 9 5.22386 9 5.5V10.5C9 10.7761 8.77614 11 8.5 11C8.22386 11 8 10.7761 8 10.5V5.5C8 5.22386 8.22386 5 8.5 5ZM3.75954 11.7027C3.86089 12.4459 4.49568 13 5.24578 13H8.75422C9.50432 13 10.1391 12.4459 10.2405 11.7027L11.4272 3H2.57281L3.75954 11.7027Z"/></svg>'
        deleteImage.classList.add("deleteImage");
        const deleteButton = Button({text: "", onClick: onDeleteTask});
        deleteButton.append(deleteImage);
        deleteButton.classList.add("deleteButton");

        const checkbox = document.createElement("img");
        checkbox.setAttribute("src", "static/checkboxTask.svg");
        checkbox.addEventListener("click", onCompleteTask);
        let span = document.createElement("span");
        span.innerHTML = `${item}`;
        span.classList.add('spanTask');

        li.append(checkbox, span, deleteButton);
        return li;
    }

    function DoneList({doneItems, searchString}) {
        const ul = document.createElement("ul");
        for (let doneItem of doneItems) {
            if (searchString) {
                if (doneItems[i].includes(searchString)) {
                    ul.append(DoneListElement({doneItem}));
                };
            } else {
                ul.append(DoneListElement({doneItem}));
            }
        }
        return ul;
    }
    
    function DoneListElement({doneItem}) {
        let li = document.createElement("li");
        const checkboxSVG = document.createElement("img");
        checkboxSVG.setAttribute("src", "static/checkboxDone.svg");
        let span = document.createElement("span");
        span.innerHTML = `${doneItem}`;
        span.classList.add("spanDone");
        li.append(checkboxSVG, span);
        return li;
    }

    /**
     * Button component
     * @param text {string}
     * @param onClick {function}
     * @returns {HTMLButtonElement} - Button element
     */
    function Button({text, onClick}) {
        const button = document.createElement("button");
        button.innerHTML = text;
        button.onclick = onClick;
        return button;
    }

    function SearchInput({searchString, placeholder, changeSearchString}) {
        const searchInput = document.createElement("INPUT");
        searchInput.setAttribute("type", "text");
        searchInput.placeholder = placeholder;
        searchInput.value = searchString;
        searchInput.addEventListener("input", () => changeSearchString());
        return searchInput;
    }

    function TextInput({placeholder, onInput }) {
        const textInput = document.createElement("INPUT");
        textInput.setAttribute("type", "text");
        textInput.placeholder = placeholder;
        textInput.oninput = onInput;
        return textInput;
    }

    function AddNewItemPopup({addItem, closePopup}) {
        
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
            textInput.value = '';
            addItem(value);
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

        const textInput = TextInput({placeholder: "New Task", onInput: changeButtonColor});
        textInput.classList.add("textInput");

        const addTaskButton = Button({text: "Add", onClick: handleAddNewItem});
        addTaskButton.classList.add("popupSubmitButton");
        addTaskButton.disabled = true;
        
        const closePopupButton = Button({text: "Cancel", onClick: handleClosePopup});
        closePopupButton.classList.add("popupCancelButton");
        divPopupButtons.append(closePopupButton, addTaskButton);
        divPopup.append(popupHeader, textInput, divPopupButtons);

        const focus = () => {
            textInput.focus();
        }

        return [divPopup, focus];
    }
    /**
     * App container
     * @returns {HTMLDivElement} - The app container
     */
    function AppHeader() {
        const [items, setItems] = useState(JSON.parse(localStorage.getItem('items'))|| []);
        const [searchString, setSearchString] = useSearchString('');

        function changeSearchString() {
            setSearchString(searchInput.value);
        }

        function addNewTask() {
            popupOverlay.style.display = "block";
            popupInputFocus();
        }

        function addItem(text) {
            items.push(text);
            localStorage.setItem('items', JSON.stringify(items));
            setItems(items);
            closePopup();
        }

        function closePopup() {
            popupOverlay.style.display = "none";
        }

        const div = document.createElement("div");
        div.classList.add("divHeader");
        const newTaskButton = Button({text: "+ New Task", onClick: addNewTask});
        newTaskButton.classList.add("buttonNewTask");
        const searchInput = SearchInput({searchString: searchString, placeholder: "Search Task", changeSearchString: changeSearchString});
        searchInput.classList.add("searchInput");
        const header = document.createElement("h1");
        header.innerHTML = "To Do List";
        const [popup, popupInputFocus] = AddNewItemPopup({addItem: addItem, 
                                                        closePopup: closePopup});

        const popupOverlay = document.createElement("div");
        popupOverlay.classList.add("popupOverlay");
        popupOverlay.append(popup);
        popupOverlay.style.display = "none"; 

        div.append(header, searchInput, newTaskButton, popupOverlay);

        return div;
    }

    function App() {
        const [items, setItems] = useState(JSON.parse(localStorage.getItem('items')) || []);
        const [doneItems, setDoneItems] = useDoneState(JSON.parse(localStorage.getItem('doneItems')) || []);
        const [searchString, setSearchString] = useSearchString('');
        localStorage.setItem('items', JSON.stringify(items));
        localStorage.setItem('doneItems', JSON.stringify(doneItems));
        function deleteTask(i) {
            items.splice(i, 1);
            localStorage.setItem('items', JSON.stringify(items));
            setItems(items);
        }

        function completeTask(i) {
            let element = items.slice(i, (i+1));
            items.splice(i, 1);
            doneItems.push(element);
            localStorage.setItem('doneItems', JSON.stringify(doneItems));
            localStorage.setItem('items', JSON.stringify(items));
            setDoneItems(doneItems);
            setItems(items);
        }

        const div = document.createElement("div");
        div.classList.add("mainDiv");
        const listsDiv = document.createElement("div");
        listsDiv.classList.add("listsDiv");
        const list = List({items, onDeleteTask: deleteTask, onCompleteTask: completeTask, searchString});
        const doneList = DoneList({doneItems, searchString});

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
    function renderHeader(){
        const appContainer = document.getElementById("functional-header");
        appContainer.innerHTML = "";
        appContainer.append(AppHeader());
    }
    function renderApp() {
        const appContainer = document.getElementById("functional-example");
        appContainer.innerHTML = "";
        appContainer.append(App());
    }

    // initial render
    renderHeader();
    renderApp();
})();