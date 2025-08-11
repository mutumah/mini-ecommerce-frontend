import { createSlice } from '@reduxjs/toolkit';

// Load initial cart state from localStorage
const loadCartFromLocalStorage = () => {
  try {
    const cart = localStorage.getItem("cart");
    return cart
      ? JSON.parse(cart)
      : { cartItems: [], totalQuantity: 0, totalPrice: 0 };
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return { cartItems: [], totalQuantity: 0, totalPrice: 0 };
  }
};

// Save cart state to localStorage
const saveCartToLocalStorage = (cart) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromLocalStorage(),
  reducers: {
    addToCart: (state, action) => {
      const incomingQty = action.payload.quantity || 1;
      const id = action.payload._id || action.payload.id;
      if (!id) return;

      const existingItem = state.cartItems.find(item => item._id === id);

      if (existingItem) {
        existingItem.quantity += incomingQty;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else {
        state.cartItems.push({
          ...action.payload,
          _id: id,
          quantity: incomingQty,
          totalPrice: action.payload.price * incomingQty
        });
      }

      state.totalQuantity = state.cartItems.reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = state.cartItems.reduce((total, item) => total + item.totalPrice, 0);

      saveCartToLocalStorage(state);
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      const itemIndex = state.cartItems.findIndex(item => item._id === id || item.id === id);

      if (itemIndex !== -1) {
        state.totalQuantity -= state.cartItems[itemIndex].quantity;
        state.totalPrice -= state.cartItems[itemIndex].totalPrice;
        state.cartItems.splice(itemIndex, 1);
        saveCartToLocalStorage(state);
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      saveCartToLocalStorage(state);
    },

    increaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.cartItems.find(item => item._id === id || item.id === id);
      if (item) {
        item.quantity += 1;
        item.totalPrice = item.price * item.quantity;
        state.totalQuantity += 1;
        state.totalPrice += item.price;
        saveCartToLocalStorage(state);
      }
    },

    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.cartItems.find(item => item._id === id || item.id === id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
          item.totalPrice = item.price * item.quantity;
          state.totalQuantity -= 1;
          state.totalPrice -= item.price;
        } else {
          state.cartItems = state.cartItems.filter(i => i._id !== id && i.id !== id);
          state.totalQuantity -= 1;
          state.totalPrice -= item.price;
        }
        saveCartToLocalStorage(state);
      }
    },
  }
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity
} = cartSlice.actions;

export default cartSlice.reducer;
