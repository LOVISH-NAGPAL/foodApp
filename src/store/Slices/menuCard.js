import { createSlice } from "@reduxjs/toolkit";

const menu = createSlice({
    name: "menu",
    initialState: {
        menuOpen: false
    },
    reducers: {
        menuChange: (state, action) => {
            state.menuOpen = !(state.menuOpen);
        }
    }
});

export default menu.reducer;
export const { menuChange } = menu.actions;  
