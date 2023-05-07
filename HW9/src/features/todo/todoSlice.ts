import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Item } from "../../models/Item";
import { apiClient } from "../../clients/apiClient";
import { RootState } from "../../app/store";
import { Tag } from "../../models/Tag";

export interface ToDoState {
    toDos: Item[],
}

const initialState: ToDoState = { toDos: [] };

export const getToDos = createAsyncThunk(
    "ToDos/getToDos",
    async () => {
        const response = await apiClient.getTodos();
        return response;
    }
);

export const addToDo = createAsyncThunk(
    "ToDos/addToDo",
    async ({ title, tag }: { title: string, tag: Tag }) => {
        const response = await apiClient.addTodo(title, tag);
        return response;
    }
);

export const deleteToDo = createAsyncThunk(
    "ToDos/deleteToDo",
    async (id: number) => {
        await apiClient.deleteTodo(id);
        return id;
    }

);

export const updateToDo = createAsyncThunk(
    "ToDos/completeToDo",
    async (item: Item) => {
        await apiClient.updateTodo(item.id, item);
        return item;
    }

);

export const slice = createSlice({
    name: "ToDos",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getToDos.fulfilled, (state, action) => {
                state.toDos = action.payload;
            })
            .addCase(addToDo.fulfilled, (state, action) => {
                state.toDos = [...state.toDos, action.payload];
            })
            .addCase(deleteToDo.fulfilled, (state, action) => {
                state.toDos = state.toDos.filter(item => item.id !== action.payload);
            })
            .addCase(updateToDo.fulfilled, (state, action) => {
                const index = state.toDos.findIndex(item => item.id === action.payload.id);
                state.toDos = [...state.toDos.slice(0, index), action.payload, ...state.toDos.slice(index + 1)];
            })
    },
});

export const selectToDos = (state: RootState) => state.toDos.toDos;
export default slice.reducer;