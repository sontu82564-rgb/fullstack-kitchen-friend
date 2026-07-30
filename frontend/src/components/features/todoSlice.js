import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

//fetch todo
export const fetchTodos = createAsyncThunk(
  "todo/fetchAll",
  async (_, ThunkApi) => {
    try {
      const res = await axios.get("http://localhost:9000/todo/getAll");
      return res.data.data;
    } catch (error) {
      return ThunkApi.rejectWithValue(error.response?.data || error.message);
    }
  },
);

//add todo
export const createTodo = createAsyncThunk(
  "todo/create",
  async (data, ThunkApi) => {
    try {
      const res = await axios.post("http://localhost:9000/todo/create", data);
      toast.success(res.data.message);
      return res.data.data;
    } catch (error) {
      return ThunkApi.rejectWithValue(error.response?.data || error.message);
    }
  },
);

//delete todo
export const deleteTodo = createAsyncThunk(
  "todo/delete",
  async (id, ThunkApi) => {
    try {
      await axios.delete(`http://localhost:9000/todo/delete/${id}`);
      toast.success("Todo deleted successfully");
      return id;
    } catch (error) {
      return ThunkApi.rejectWithValue(error);
    }
  },
);

//update todo
export const updateTodo = createAsyncThunk(
  "todo/update",
  async ({ id, data }, ThunkApi) => {
    try {
      const res = await axios.put(
        `http://localhost:9000/todo/update/${id}`,
        data,
      );
      toast.success(res.data.message);
      return res.data.data;
    } catch (error) {
      return ThunkApi.rejectWithValue(error);
    }
  },
);

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Todos
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      // add Todo
      .addCase(createTodo.fulfilled, (state, action) => {
        if (action.payload) state.todos.push(action.payload);
      })

      // delete Todo
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((item) => item._id !== action.payload);
      })

      // update Todo
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          (item) => item._id === action.payload._id,
        );

        if (index !== -1) state.todos[index] = action.payload;
      });
  },
});

export default todoSlice.reducer;
