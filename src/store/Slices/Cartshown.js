import { createSlice } from "@reduxjs/toolkit";

const cartShown = createSlice({
    name: "cartShown",
    initialState: {
        show: false,
    },
    reducers: {
        toggleCart: (state,action) => { 
            state.show = !state.show;

        }
    }})
export const cartShownReducer = cartShown.reducer;
export const { toggleCart } = cartShown.actions;