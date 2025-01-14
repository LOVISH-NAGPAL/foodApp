import { createSlice } from "@reduxjs/toolkit";


const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
};


const saveCartToLocalStorage = (cartItems) => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

const cartData = createSlice({
    name: "cartData",
    initialState: {
        cartItems: loadCartFromLocalStorage(),
    },
    reducers: {
        addProduct: (state, action) => {
            if (state.cartItems.find((item) => item.id === action.payload.id)) {
                const updatedCart = state.cartItems.map((item) =>
                    item.id === action.payload.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                            totalPrice: (item.quantity + 1) * item.price,
                        }
                        : item
                );
                state.cartItems = updatedCart;
            } else {
                let data = action.payload;
                data = { ...data, quantity: 1, totalPrice: data.price, disable: true };
                state.cartItems.push(data);
            }

            saveCartToLocalStorage(state.cartItems);
        },
        removeProduct: (state, action) => {
            if (action.payload.quantity > 1) {
                const updatedCart = state.cartItems.map((item) =>
                    item.id === action.payload.id
                        ? {
                            ...item,
                            quantity: item.quantity - 1,
                            totalPrice: (item.quantity - 1) * item.price,
                        }
                        : item
                );
                state.cartItems = updatedCart;
            } else {
                state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
            }

            saveCartToLocalStorage(state.cartItems);
        },
        deleteOption: (state, action) => {
            state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);

            saveCartToLocalStorage(state.cartItems);
        },
    },
});

export const { addProduct, removeProduct, deleteOption } = cartData.actions;
export default cartData.reducer;
