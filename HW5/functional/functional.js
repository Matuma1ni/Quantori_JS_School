(function () {
    let state = undefined;
    let doneState = undefined;

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

    /**
     * Functional component for the list
     * @param items {string[]}
     * @returns {HTMLElement} - List element
     */
    function List({items, onDeleteTask}) {
        /* const listItems = items.map((item) => `<li>${item}</li>`).join(""); */
        const ul = document.createElement("ul");
        const listItems = [];
        for (let i=0; i<items.length; i++) {
            ul.append(ListElement({item: items[i], onDeleteTask: () => onDeleteTask(i)}));
        }
        /* ul.innerHTML = listItems; */
        return ul;
    }
    function ListElement({item, onDeleteTask}) {
        let li = document.createElement("li");
        const deleteButton = Button({text: "🗑", onClick: onDeleteTask});
        const checkbox = document.createElement("INPUT");
        checkbox.setAttribute("type", "checkbox");
        li.append(checkbox, `${item}`, deleteButton);
        return li;
    }
    function DoneList({doneItems}) {
        const listItems = doneItems.map((item) => `<li>${item}</li>`).join("");
        const ul = document.createElement("ul");
        ul.innerHTML = listItems;
        return ul;
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

    function TextInput(placeholder) {
        const textInput = document.createElement("INPUT");
        textInput.setAttribute("type", "text");
        textInput.placeholder = placeholder;
        let value = textInput.value;
        return textInput;
    }


    /**
     * App container
     * @returns {HTMLDivElement} - The app container
     */
    function App() {
        const [items, setItems] = useState(["Task 1 Title", "Task 2 Title", "Task 3 Title"]);
        const [doneItems, setDoneItems] = useDoneState(["Completed Task 1 Title", "Completed Task 2 Title"]);

        function addNewTask() {
            divPopup.style.display = "block";
        }

        function addItem() {
            text = popupTextInput.value;
            setItems([...items, `${text}`]);
        }

        function closePopup() {
            divPopup.style.display = "none";
        }

        function deleteTask(i) {
            items.splice(i, 1);
            setItems(items);
        }

        const div = document.createElement("div");
        const list = List({items, onDeleteTask: deleteTask});
        const doneList = DoneList({doneItems});
        const newTaskButton = Button({text: "+ New Task", onClick: addNewTask});
        const textInput = TextInput("Search Task");
        const header = document.createElement("h1");
        header.innerHTML = "To Do List";
        const taskHeader = document.createElement("h3");
        taskHeader.innerHTML = "All Tasks";
        const doneHeader = document.createElement("h3");
        doneHeader.innerHTML = "Completed Tasks";
        const divPopup = document.createElement("div");
        const popupTextInput = TextInput("New Task");
        const addTaskButton = Button({text: "Add", onClick: addItem});
        const closePopupButton = Button({text: "Cancel", onClick: closePopup});
        divPopup.append(popupTextInput, closePopupButton, addTaskButton);
        divPopup.style.display = "none";
        div.append(header, textInput, newTaskButton, taskHeader, list, doneHeader, doneList, divPopup);
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