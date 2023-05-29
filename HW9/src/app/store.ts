import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import toDosReducer from "../features/todo/todoSlice";
import {createStateSyncMiddleware, initMessageListener} from "redux-state-sync";
import userReducer from "../features/user/userSlice";

const reduxStateSyncConfig = {};

export const store = configureStore({
  reducer: {
    toDos: toDosReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(createStateSyncMiddleware(reduxStateSyncConfig)),
});

initMessageListener(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
