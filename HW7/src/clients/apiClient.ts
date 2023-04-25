import { Tag } from "../models/Tag";
import { Item } from "../models/Item";
export const apiClient = {
    getTodos: async function(): Promise<Item[]> {
        const response = await fetch('http://localhost:3004/tasks');
        return response.json();
    },
    addTodo: async function(title: string, tag: Tag): Promise<Item> {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, tag, isCompleted: false })
        };
        const response = await fetch('http://localhost:3004/tasks', requestOptions);
        return response.json();
    },
    updateTodo: async function(id: number, item: Item): Promise<void> {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        };
        const response = await fetch(`http://localhost:3004/tasks/${id}`, requestOptions);
    },
    deleteTodo: async function(id: number): Promise<void> {
        const requestOptions = {
            method: 'DELETE'
        };
        const response = await fetch(`http://localhost:3004/tasks/${id}`, requestOptions);
    }
};