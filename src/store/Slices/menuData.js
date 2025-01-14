import { createSlice } from "@reduxjs/toolkit";
import FoodData from "../../assets/data";

const menuData = createSlice({
  name: "menuData",
  initialState: {
    Data: JSON.parse(localStorage.getItem("menuData")) || FoodData, 
    editData: null,
  },
  reducers: {
    menuInfo: (state, action) => {
      if (action.payload && typeof action.payload === "object" && !action.payload.id) {
        
        const id =
          state.Data.length > 0
            ? Math.max(...state.Data.map((item) => item.id)) + 1
            : 1;

        const updatedPayload = { ...action.payload, id };

        state.Data = [...state.Data, updatedPayload]; 
        localStorage.setItem("menuData", JSON.stringify(state.Data));
      } else if (action.payload && typeof action.payload === "object" && action.payload.id) {
       
        state.Data = state.Data.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
        localStorage.setItem("menuData", JSON.stringify(state.Data));
      }
    },

    deleteMenu: (state, action) => {
      
      state.Data = state.Data.filter((item) => item.id !== action.payload);

      
      localStorage.setItem("menuData", JSON.stringify(state.Data));
    },
    editMenu: (state, action) => {
      const data = state.Data.filter(item => item.id === action.payload.id)
      state.editData = data[0]


    },
    clearEdit: (state) => {
      state.editData = null
    }
  },
});

export default menuData.reducer;
export const { menuInfo, deleteMenu, editMenu, clearEdit } = menuData.actions;
