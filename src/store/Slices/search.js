import { createSlice } from "@reduxjs/toolkit";

const search = createSlice({
    name: "search",
    initialState: {
        search: ""
    },
    reducers: {
        searching: (state, action) => {
            state.search = action.payload;
        }
    }
});

export default search.reducer;
export const { searching } = search.actions;
