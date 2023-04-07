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
        /* const listItems = items.map((item) => `<li>${item}</li>`).join(""); */
        const ul = document.createElement("ul");
        const listItems = [];
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
        /* ul.innerHTML = listItems; */
        return ul;
    }

    function ListElement({item, onDeleteTask, onCompleteTask}) {
        let li = document.createElement("li");
        const deleteImage = document.createElement("img");
        deleteImage.setAttribute("src", "static/deleteButton.svg");
        deleteImage.classList.add("deleteImage");
        const deleteButton = Button({text: "", onClick: onDeleteTask});
        deleteButton.append(deleteImage);
        deleteButton.classList.add("deleteButton");

        const checkbox = document.createElement("img");
        checkbox.setAttribute("src", "static/checkboxTask.svg");
        /*checkbox.onchange = function(){onCompleteTask}; */
        checkbox.addEventListener("click", onCompleteTask);
        let span = document.createElement("span");
        span.innerHTML = `${item}`;
        span.classList.add('spanTask');

        li.append(checkbox, span, deleteButton);
        return li;
    }

    function DoneList({doneItems, searchString}) {
        const ul = document.createElement("ul");
        for (let i=0; i<doneItems.length; i++) {
            if (searchString) {
                if (doneItems[i].includes(searchString)) {
                    ul.append(DoneListElement({doneItem: doneItems[i]}));
                };
            } else {
                ul.append(DoneListElement({doneItem: doneItems[i]}));
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

    function TextInput(searchString, placeholder, changeSearchString) {
        const textInput = document.createElement("INPUT");
        textInput.setAttribute("type", "text");
        textInput.placeholder = placeholder;
        textInput.value = searchString;
        textInput.addEventListener("change", () => changeSearchString());
        return textInput;
    }


    /**
     * App container
     * @returns {HTMLDivElement} - The app container
     */
    function App() {
        const [items, setItems] = useState(["Task 1 Title", "Task 2 Title", "Task 3 Title"]);
        const [doneItems, setDoneItems] = useDoneState(["Completed Task 1 Title", "Completed Task 2 Title"]);
        const [searchString, setSearchString] = useSearchString('');

        function addNewTask() {
            popupOverlay.style.display = "block";

        }

        function addItem() {
            text = popupTextInput.value;
            setItems([...items, `${text}`]);
        }

        function closePopup() {
            popupOverlay.style.display = "none";
        }

        function deleteTask(i) {
            items.splice(i, 1);
            setItems(items);
        }

        function completeTask(i) {
            let element = items.slice(i, 1);
            items.splice(i, 1);
            setDoneItems([...doneItems, element]);
            setItems(items);
        }

        function changeSearchString() {
            setSearchString(textInput.value);
        }

        const div = document.createElement("div");
        div.classList.add("mainDiv");
        const listsDiv = document.createElement("div");
        listsDiv.classList.add("listsDiv");
        const list = List({items, onDeleteTask: deleteTask, onCompleteTask: completeTask, searchString});
        const doneList = DoneList({doneItems, searchString});

        const newTaskButton = Button({text: "+ New Task", onClick: addNewTask});
        newTaskButton.classList.add("buttonNewTask");
        const textInput = TextInput(searchString, "Search Task", changeSearchString);
        textInput.classList.add("textInput");
        const header = document.createElement("h1");
        header.innerHTML = "To Do List";

        const taskHeader = document.createElement("h3");
        taskHeader.innerHTML = "All Tasks";
        const doneHeader = document.createElement("h3");
        doneHeader.innerHTML = "Completed Tasks";
        listsDiv.append(taskHeader, list, doneHeader, doneList,)
        
        const popupOverlay = document.createElement("div");
        popupOverlay.classList.add("popupOverlay");
        const divPopup = document.createElement("div");
        divPopup.classList.add("divPopup");
        const popupHeader = document.createElement("h3");
        popupHeader.innerHTML = "Add New Task";
        const divPopupButtons = document.createElement("div");
        divPopupButtons.classList.add("divPopupButtons");
        const popupTextInput = TextInput("New Task");
        popupTextInput.classList.add("popupTextInput");
        const addTaskButton = Button({text: "Add", onClick: addItem});
        addTaskButton.classList.add("popupSubmitButton");
        const closePopupButton = Button({text: "Cancel", onClick: closePopup});
        closePopupButton.classList.add("popupCancelButton");
        popupOverlay.append(divPopup);
        divPopupButtons.append(closePopupButton, addTaskButton);
        divPopup.append(popupHeader, popupTextInput, divPopupButtons);
        popupOverlay.style.display = "none";

        div.append(header,  popupOverlay, textInput, newTaskButton, listsDiv,);
        return div;
    }

    /**
     * Render the app.
     * On change whole app is re-rendered.
     */
    function renderApp() {
        const appContainer = document.getElementById("functional-example");
        appContainer.innerHTML = "";
        appContainer.append(App());
    }

    // initial render
    renderApp();
})();