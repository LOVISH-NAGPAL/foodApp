import { configureStore } from "@reduxjs/toolkit";
import { cartShownReducer } from "./Slices/Cartshown";
import cartDatareducer from "./Slices/cartData";
import categoryreducer from "./Slices/category";
import searchreducer from "./Slices/search";
import menureducer from './Slices/menuCard';
import menuDatareducer from './Slices/menuData';

const store = configureStore({
    reducer: {
        cartShow: cartShownReducer,
        cartData: cartDatareducer,
        category: categoryreducer,
        search: searchreducer,
        menu: menureducer,
        menuData:menuDatareducer
    }
})
export default store;