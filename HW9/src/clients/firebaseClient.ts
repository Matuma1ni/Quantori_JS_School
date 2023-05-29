import { Tag } from "../models/Tag";
import { Item } from "../models/Item";
import { db } from "../firebaseConfig";
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";

export const firebaseClient = {
    getTodos: async function (): Promise<Item[]> {
        const querySnapshot = await getDocs(collection(db, "toDos"));
        const todoList: Item[] = [];
        querySnapshot.forEach((doc) => {
            todoList.push({ id: doc.id, ...doc.data() } as Item);
        });
        return todoList;
    },

    addTodo: async function (title: string, tag: Tag): Promise<Item> {
        const docRef = await addDoc(collection(db, "toDos"), {
            title, tag, isCompleted: false
        });

        return { id: docRef.id, title, tag, isCompleted: false };
    },

    updateTodo: async function (id: number | string, item: Item): Promise<void> {
        await setDoc(doc(db, "toDos", id.toString()), {
            title: item.title,
            isCompleted: item.isCompleted,
            tag: item.tag,
          });
    },

    deleteTodo: async function (id: number | string): Promise<void> {
        await deleteDoc(doc(db, "toDos", id.toString()));
    }
};