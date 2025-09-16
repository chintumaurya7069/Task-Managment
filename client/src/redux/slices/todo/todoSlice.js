import { createSlice } from "@reduxjs/toolkit";
import {
  editTask,
  fetchByIdTask,
  fetchTask,
  insertTask,
  removeTask,
} from "./todoAsyncThunk";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    taskData: [],
    singleTaskData: {},
    error: null,
    loading: false,
    deleteLoading: false,
    mainLoader: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    isFormEmpty: (state) => {
      state.singleTaskData = {};
    },
  },
  extraReducers: (builder) => {
    builder

      // all fetch
      .addCase(fetchTask.pending, (state) => {
        state.mainLoader = true;
      })
      .addCase(fetchTask.fulfilled, (state, action) => {
        state.mainLoader = false;
        state.taskData = action.payload;
      })
      .addCase(fetchTask.rejected, (state, action) => {
        state.mainLoader = false;
        state.error = action.payload?.message;
      })

      // fetch By ID
      .addCase(fetchByIdTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchByIdTask.fulfilled, (state, action) => {
        state.loading = false;
        state.singleTaskData = action.payload;
      })
      .addCase(fetchByIdTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // create
      .addCase(insertTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(insertTask.fulfilled, (state, action) => {
        state.loading = false;
        state.taskData.push(action.payload);
      })
      .addCase(insertTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // edit
      .addCase(editTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTask = action.payload;
        state.taskData = state.taskData.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        );
      })
      .addCase(editTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // remove
      .addCase(removeTask.pending, (state) => {
        state.deleteLoading = true;
      })

      .addCase(removeTask.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.taskData = state.taskData.filter(
          (tasks) => tasks._id !== action.payload.figurineId
        );
      })
      .addCase(removeTask.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      });
  },
});
export const { clearError, isFormEmpty } = taskSlice.actions;
export default taskSlice.reducer;
