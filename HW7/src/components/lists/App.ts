import { useSearchString, useState } from '../../renders';
import { apiClient } from '../../clients/apiClient';
import { List } from './List';
import { DoneList } from './DoneList';
import './App.css';

/**
 * App container
 * @returns {HTMLDivElement} - The app container
 */   
export async function App(): Promise<HTMLElement> {
    const [items, setItems] = useState(await apiClient.getTodos());
    const todoItems = items.filter(item => item.isCompleted === false);
    const completedItems = items.filter(item => item.isCompleted === true);
    const [searchString, _] = useSearchString('');

    async function deleteTask(id: number) {
        await apiClient.deleteTodo(id);
        const newItems = await apiClient.getTodos();
        setItems(newItems);
    }

    async function completeTask(id: number) {
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
    taskHeader.classList.add("listHeader");
    const doneHeader = document.createElement("h3");
    doneHeader.innerHTML = "Completed Tasks";
    doneHeader.classList.add("listHeader");
    listsDiv.append(taskHeader, list, doneHeader, doneList,);
    
    div.append(listsDiv,);
    return div;
}