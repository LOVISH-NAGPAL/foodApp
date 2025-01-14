import { createSlice } from "@reduxjs/toolkit";

const category = createSlice({
    name: "category",
    initialState: {
        category: "All"
    },
    reducers: {
        changeCategory: (state, action) => {
            state.category = action.payload;
        }
    }
});

export default category.reducer;
export const { changeCategory } = category.actions;
