import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Удаление продукта
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id) => {
    await fetch(`http://localhost:5000/card/${id}`, {
      method: 'DELETE',
    });
    return id; // Возвращаем ID удаленного продукта
  }
);

// Изменение продукта
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (updatedProduct) => {
    const { id, ...productData } = updatedProduct;
    const response = await fetch(`http://localhost:5000/card/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    const data = await response.json();
    return data; // Возвращаем обновленные данные продукта
  }
);

// Фетч продуктов
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('http://localhost:5000/card');
    const data = await response.json();
    return data;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default productsSlice.reducer;
