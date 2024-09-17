// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slice/fetchCards';

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});
