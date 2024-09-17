import { createAsyncThunk } from '@reduxjs/toolkit';

// Добавление продукта
export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (newProduct) => {
    const response = await fetch('http://localhost:5000/card', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });
    const data = await response.json();
    return data; // Возвращаем добавленный продукт
  }
);
