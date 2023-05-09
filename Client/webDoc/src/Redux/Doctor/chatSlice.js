import { createSlice } from "@reduxjs/toolkit";

export const chatUserSlice = createSlice({
    name: "chatUser",
    initialState: {
        user: null
    },
    reducers: {
        chatUserData: (state, action) => {
            state.user = action.payload;
        }
    }
})

export const {chatUserData} = chatUserSlice.actions;
export const selectUser = (state) => state.chatUser.chatUser;
export default chatUserSlice.reducer;