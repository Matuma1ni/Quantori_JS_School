import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import { RootState } from "../../app/store";

export interface UserState {
    user: User | null,
}

const initialState: UserState = { user: null };

export const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User | null>) {
            state.user = action.payload;
        },
    },
});

export const selectUser = (state: RootState) => state.user.user;
export const { setUser } = userSlice.actions;
export default userSlice.reducer;