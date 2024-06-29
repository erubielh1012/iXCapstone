import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import categoryService from "../services/categoryService";

const initialState = {
  addCategory: null,
  editCategory: null,
  deleteCat: null,
  categories: [],
  category: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, thunkAPI) => {
    try {
      return await categoryService.fetchCategories();
    } catch (error) {
      const message = error.message || error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async(category, thunkAPI) => {
    try {
      return await categoryService.updateCategory(category);
    } catch (error) {
      const message = error.message || error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async(categoryId, thunkAPI) => {
    try {
      return await categoryService.createCategory(categoryId);
    } catch (error) {
      const message = error.message || error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deletedCategory",
  async(category, thunkAPI) => {
    try {
      return await categoryService.deleteCategory(category.id);
    } catch (error) {
      const message = error.message || error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    reset: (state) => initialState,
    resetSuccessAndError: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    setEditCategory: (state, {payload}) => {
      state.editCategory = payload;
      state.addCategory = null;
      state.deleteCat = null;
    },
    setAddCategory: (state, {payload}) => {
      state.editCategory = null;
      state.addCategory = payload;
      state.deleteCat = null;
    },
    setDeleteCategory: (state, {payload}) => {
      state.editCategory = null;
      state.addCategory = null;
      state.deleteCat = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, { payload }) => {
        state.categories = payload.data;
        state.isSuccess = true;
        state.isLoading = false;
        state.message = payload.message;
      })
      .addCase(fetchCategories.rejected, (state, { payload }) => {
        state.message = payload;
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, {payload}) => {
        state.categories.push(payload.data);
        state.addCategory = null;
        state.isSuccess = true;
        state.isLoading = false;
        state.message = payload.message;
      })
      .addCase(createCategory.rejected, (state, {payload}) => {
        state.isError = true;
        state.isLoading = false;
        state.message = payload.message;
      })
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state, {payload}) => {
        const index = state.categories.findIndex((x) => x.id === payload.data.id);
        state.categories = state.categories.filter((x) => x.id !== payload.data.id);;
        state.categories.splice(index, 0, payload.data);
        state.editCategory = null;
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
        state.message = payload.message;
      })
      .addCase(updateCategory.rejected, (state, {payload}) => {
        // state.editCategory = null;
        state.isError = true;
        state.isLoading = false;
        state.message = payload.message;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, {payload}) => {
        state.categories = state.categories.filter((x) => x.id !== payload.id);;
        state.deleteCat = null;
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
        state.message = payload.message;
      })
      .addCase(deleteCategory.rejected, (state, {payload}) => {
        // state.editCategory = null;
        state.isError = true;
        state.isLoading = false;
        state.message = payload.message;
      })
  },
});

export const { 
  reset, 
  resetSuccessAndError, 
  setEditCategory,
  setAddCategory,
  setDeleteCategory,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;